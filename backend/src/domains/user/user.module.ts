import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/infra/providers/cryptography/cryptography.module'
import { PrismaModule } from '@/infra/providers/prisma/prisma.module'
import { PrismaUserRepository } from './repositories/prisma.user.repository'
import { UserRepository } from './repositories/user.repository'
import { CreateUserController } from './use-cases/create/create-user.controller'
import { CreateUserService } from './use-cases/create/create-user.service'

@Module({
  controllers: [CreateUserController],
  imports: [PrismaModule, CryptographyModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    CreateUserService,
  ],
})
export class UserModule {}
