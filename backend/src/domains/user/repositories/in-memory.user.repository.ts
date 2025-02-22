import { randomUUID } from 'node:crypto'
import { sleep } from '@/infra/utils/helper-functions'
import {
  type CreateUserArgs,
  type FindOneUserArgs,
  type UpdateUserArgs,
  UserRepository,
} from './user.repository'
import type { User } from '@prisma/client'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  reset() {
    this.users = []
  }

  async create({ data }: CreateUserArgs): Promise<User> {
    await sleep()

    const user: User = {
      id: randomUUID(),
      ...data,
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

  async findOne(args: FindOneUserArgs): Promise<User | null> {
    await sleep()
    const [key, value] = Object.entries(args.where)[0]
    const user = this.users.find(user => user[key] === value)

    return user || null
  }

  async update(args: UpdateUserArgs): Promise<User | null> {
    await sleep()
    const { data, where } = args
    const index = this.users.findIndex(user => user.id === where.id)
    this.users[index] = Object.assign(this.users[index], data)
    return this.users[index]
  }
}
