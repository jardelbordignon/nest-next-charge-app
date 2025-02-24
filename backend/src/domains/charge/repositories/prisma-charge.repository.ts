import { Charge } from '@prisma/client'
import { PrismaService } from '@/infra/providers/prisma/prisma.service'
import {
  ChargeRepository,
  CreateChargeArgs,
  FindManyChargeArgs,
  FindOneChargeArgs,
  UpdateChargeArgs,
} from './charge.repository'

export class PrismaChargeRepository
  extends PrismaService
  implements ChargeRepository
{
  create(args: CreateChargeArgs): Promise<Charge> {
    return this.charge.create(args)
  }

  findMany(args: FindManyChargeArgs): Promise<Charge[]> {
    return this.charge.findMany(args)
  }

  findOne(args: FindOneChargeArgs): Promise<Charge | null> {
    return this.charge.findUnique(args)
  }

  update(args: UpdateChargeArgs): Promise<Charge | null> {
    return this.charge.update(args)
  }
}
