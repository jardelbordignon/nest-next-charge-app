import { Module } from '@nestjs/common'
import { CryptographyModule } from '@/infra/providers/cryptography/cryptography.module'
import { PrismaModule } from '@/infra/providers/prisma/prisma.module'
import { PrismaUserRepository } from './repositories/prisma.user.repository'
import { UserRepository } from './repositories/user.repository'
import { AuthenticateUserController } from './use-cases/authenticate/authenticate-user.controller'
import { AuthenticateUserService } from './use-cases/authenticate/authenticate-user.service'
import { CreateUserController } from './use-cases/create/create-user.controller'
import { CreateUserService } from './use-cases/create/create-user.service'
import { DeleteUserController } from './use-cases/delete/delete-user.controller'
import { DeleteUserService } from './use-cases/delete/delete-user.service'
import { FindManyUserController } from './use-cases/find-many/find-many-user.controller'
import { FindManyUserService } from './use-cases/find-many/find-many-user.service'

@Module({
  controllers: [
    CreateUserController,
    DeleteUserController,
    FindManyUserController,
    AuthenticateUserController,
  ],
  imports: [PrismaModule, CryptographyModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    CreateUserService,
    DeleteUserService,
    FindManyUserService,
    AuthenticateUserService,
  ],
})
export class UserModule {}
