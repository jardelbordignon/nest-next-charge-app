import { Injectable } from '@nestjs/common'
import {
  ChargeRepository,
  type FindManyChargeArgs,
} from '../../repositories/charge.repository'
import type { Charge } from '@prisma/client'

@Injectable()
export class FindManyChargeService {
  constructor(private chargeRepository: ChargeRepository) {}

  async execute(args: FindManyChargeArgs): Promise<Charge[]> {
    const charges = await this.chargeRepository.findMany(args)
    return charges
  }
}
