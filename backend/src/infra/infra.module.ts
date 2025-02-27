import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'
import { AuthenticationModule } from './providers/authentication/authentication.module'
import { CryptographyModule } from './providers/cryptography/cryptography.module'
import { PaymentProviderModule } from './providers/payment/payment.module'
import { PrismaModule } from './providers/prisma/prisma.module'

@Module({
  imports: [
    EnvModule,
    PrismaModule,
    CryptographyModule,
    AuthenticationModule,
    PaymentProviderModule,
  ],
})
export class InfraModule {}
