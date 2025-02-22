import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'
import { CryptographyModule } from './providers/cryptography/cryptography.module'
import { PrismaModule } from './providers/prisma/prisma.module'

@Module({
  imports: [EnvModule, PrismaModule, CryptographyModule],
})
export class InfraModule {}
