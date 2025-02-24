import { randomUUID } from 'node:crypto'
import { Charge } from '@prisma/client'
import { sleep } from '@/infra/utils/helper-functions'
import {
  ChargeRepository,
  CreateChargeArgs,
  FindManyChargeArgs,
  FindOneChargeArgs,
  UpdateChargeArgs,
} from './charge.repository'

export class InMemoryChargeRepository implements ChargeRepository {
  private charges: Charge[] = []

  reset() {
    this.charges = []
  }

  async create({ data }: CreateChargeArgs): Promise<Charge> {
    await sleep()

    const charge: Charge = {
      id: randomUUID(),
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      createdById: data.createdById!,
      receivedById: data.receivedById!,
      payedAt: data.payedAt ? new Date(data.payedAt) : null,
      createdAt: new Date(),
      updatedAt: null,
    }

    this.charges.push(charge)

    return charge
  }

  async findMany(args: FindManyChargeArgs): Promise<Charge[]> {
    await sleep()
    if (!args.where) {
      return this.charges
    }

    const where = args.where
    const keys = Object.keys(where)

    return this.charges.filter(charge => {
      for (const key of keys) {
        if (charge[key] !== where[key]) {
          return false
        }
      }
      return true
    })
  }

  async findOne(args: FindOneChargeArgs): Promise<Charge | null> {
    await sleep()
    const [key, value] = Object.entries(args.where)[0]
    const charge = this.charges.find(charge => charge[key] === value)

    return charge || null
  }

  async update(args: UpdateChargeArgs): Promise<Charge | null> {
    await sleep()
    const { data, where } = args
    const index = this.charges.findIndex(charge => charge.id === where.id)

    this.charges[index] = Object.assign(this.charges[index], data)
    return this.charges[index]
  }
}
