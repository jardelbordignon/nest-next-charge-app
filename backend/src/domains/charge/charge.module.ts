import { Module } from '@nestjs/common'
import { AppSocketGateway } from '@/app/app.socket.gateway'
import { SocketGateway } from '@/app/socket.gateway'
import { AsaasPaymentProvider } from '@/infra/providers/payment/asaas-payment'
import { PaymentProvider } from '@/infra/providers/payment/payment'
import { PrismaModule } from '@/infra/providers/prisma/prisma.module'
import { PrismaUserRepository } from '../user/repositories/prisma.user.repository'
import { UserRepository } from '../user/repositories/user.repository'
import { ChargeRepository } from './repositories/charge.repository'
import { PrismaChargeRepository } from './repositories/prisma-charge.repository'
import { CreateChargeController } from './use-cases/create/create-charge.controller'
import { CreateChargeService } from './use-cases/create/create-charge.service'
import { FindManyChargeController } from './use-cases/find-many/find-many-charge.controller'
import { FindManyChargeService } from './use-cases/find-many/find-many-charge.service'
import { GetBoletoDataController } from './use-cases/get-boleto-data/get-boleto-data.controller'
import { GetBoletoDataService } from './use-cases/get-boleto-data/get-boleto-data.service'
import { GetPixDataController } from './use-cases/get-pix-data/get-pix-data.controller'
import { GetPixDataService } from './use-cases/get-pix-data/get-pix-data.service'
import { WebhookChargeController } from './use-cases/webhook/webhook-charge.controller'
import { WebhookChargeService } from './use-cases/webhook/webhook-charge.service'

@Module({
  controllers: [
    CreateChargeController,
    FindManyChargeController,
    GetBoletoDataController,
    GetPixDataController,
    WebhookChargeController,
  ],
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
    {
      provide: SocketGateway,
      useClass: AppSocketGateway,
    },
    CreateChargeService,
    FindManyChargeService,
    GetBoletoDataService,
    GetPixDataService,
    WebhookChargeService,
  ],
})
export class ChargeModule {}
