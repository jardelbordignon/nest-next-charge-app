import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/providers/prisma/prisma.service'
import {
  type CreateUserArgs,
  type UpdateUserArgs,
  UserRepository,
} from './user.repository'
import type { Prisma, User } from '@prisma/client'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }

  create(args: CreateUserArgs): Promise<User> {
    return this.prisma.user.create(args)
  }

  findMany(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  findOne<T extends Prisma.UserFindUniqueArgs>(
    args: T,
  ): Promise<
    T['include'] extends Record<string, any> ? Prisma.UserGetPayload<T> : User | null
  > {
    return this.prisma.user.findUnique(args) as any
  }

  update(args: UpdateUserArgs): Promise<User | null> {
    return this.prisma.user.update(args)
  }
}
