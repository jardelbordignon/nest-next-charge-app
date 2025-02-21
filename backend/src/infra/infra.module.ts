import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'
import { PrismaModule } from './providers/prisma/prisma.module'

@Module({
  imports: [EnvModule, PrismaModule],
})
export class InfraModule {}
