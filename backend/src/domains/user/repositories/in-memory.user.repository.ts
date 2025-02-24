import { randomUUID } from 'node:crypto'
import { sleep } from '@/infra/utils/helper-functions'
import {
  type CreateUserArgs,
  type UpdateUserArgs,
  UserRepository,
} from './user.repository'
import type { User, PaymentProvider, Prisma } from '@prisma/client'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []
  private paymentProviders: PaymentProvider[] = []

  reset() {
    this.users = []
  }

  async create({ data }: CreateUserArgs): Promise<User> {
    await sleep()

    const user: User = {
      id: randomUUID(),
      ...data,
      addressComplement: data.addressComplement || null,
      createdAt: new Date(),
      updatedAt: null,
    }

    this.users.push(user)

    return user
  }

  async delete(id: string): Promise<void> {
    await sleep()
    this.users = this.users.filter(user => user.id !== id)
  }

  async findMany(): Promise<User[]> {
    await sleep()
    return this.users
  }

  async findOne<T extends Prisma.UserFindUniqueArgs>(
    args: T,
  ): Promise<
    T['include'] extends Record<string, any> ? Prisma.UserGetPayload<T> : User | null
  > {
    await sleep()
    const [key, value] = Object.entries(args.where)[0]
    const user = this.users.find(user => user[key] === value)

    if (user && args.include) {
      const [k] = Object.entries(args.include)[0]
      const include = this[k].filter(p => p.userId === user.id)
      Object.assign(user, { [k]: include })
    }

    return (user as any) || null
  }

  async update(args: UpdateUserArgs): Promise<User | null> {
    await sleep()
    const { data, where } = args
    const index = this.users.findIndex(user => user.id === where.id)
    if (index === -1) return null

    const paymentProvidersData = data.paymentProviders
    delete data.paymentProviders

    this.users[index] = Object.assign(this.users[index], data)

    if (paymentProvidersData && paymentProvidersData.create) {
      const createPaymentProviders = paymentProvidersData.create
      if (Array.isArray(createPaymentProviders)) {
        for (const providerData of createPaymentProviders) {
          const newProvider: PaymentProvider = {
            id: randomUUID(),
            userId: where.id!,
            ...providerData,
          }
          this.paymentProviders.push(newProvider)
        }
      } else {
        const newProvider: PaymentProvider = {
          id: randomUUID(),
          userId: where.id!,
          ...createPaymentProviders,
        }
        this.paymentProviders.push(newProvider)
      }
    }

    return this.users[index]
  }
}
