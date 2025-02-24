import { Module } from '@nestjs/common'
import { AsaasPaymentProvider } from '@/infra/providers/payment/asaas-payment'
import { PaymentProvider } from '@/infra/providers/payment/payment'
import { PrismaModule } from '@/infra/providers/prisma/prisma.module'
import { PrismaUserRepository } from '../user/repositories/prisma.user.repository'
import { UserRepository } from '../user/repositories/user.repository'
import { ChargeRepository } from './repositories/charge.repository'
import { PrismaChargeRepository } from './repositories/prisma-charge.repository'
import { CreateChargeController } from './use-cases/create/create-charge.controller'
import { CreateChargeService } from './use-cases/create/create-charge.service'

@Module({
  controllers: [CreateChargeController],
  imports: [PrismaModule],
  providers: [
    {
      provide: ChargeRepository,
      useClass: PrismaChargeRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: PaymentProvider,
      useClass: AsaasPaymentProvider,
    },
    CreateChargeService,
  ],
})
export class ChargeModule {}
