import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/providers/prisma/prisma.service'
import {
  type CreateUserArgs,
  type FindOneUserArgs,
  type UpdateUserArgs,
  UserRepository,
} from './user.repository'
import type { User } from '@prisma/client'

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

  findOne(args: FindOneUserArgs): Promise<User | null> {
    return this.prisma.user.findUnique(args)
  }

  update(args: UpdateUserArgs): Promise<User | null> {
    return this.prisma.user.update(args)
  }
}
