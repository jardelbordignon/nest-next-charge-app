import { Prisma, Charge } from '@prisma/client'

export type CreateChargeArgs = Prisma.ChargeCreateArgs
export type FindManyChargeArgs = Prisma.ChargeFindManyArgs
export type FindOneChargeArgs = Prisma.ChargeFindUniqueArgs
export type UpdateChargeArgs = Prisma.ChargeUpdateArgs

export abstract class ChargeRepository {
  abstract create(args: CreateChargeArgs): Promise<Charge>
  abstract findMany(args: FindManyChargeArgs): Promise<Charge[]>
  abstract findOne(args: FindOneChargeArgs): Promise<Charge | null>
  abstract update(args: UpdateChargeArgs): Promise<Charge | null>
}
