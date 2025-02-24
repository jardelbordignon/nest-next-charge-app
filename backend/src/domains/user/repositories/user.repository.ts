import { Prisma, User } from '@prisma/client'

export type CreateUserArgs = Prisma.UserCreateArgs
export type FindOneUserArgs = Prisma.UserFindUniqueArgs
export type UpdateUserArgs = Prisma.UserUpdateArgs

export abstract class UserRepository {
  abstract create(args: CreateUserArgs): Promise<User>
  abstract delete(id: string): Promise<void>
  abstract findMany(): Promise<User[]>
  abstract findOne<T extends Prisma.UserFindUniqueArgs>(
    args: T,
  ): Promise<
    T['include'] extends Record<string, any> ? Prisma.UserGetPayload<T> : User | null
  >

  abstract update(args: UpdateUserArgs): Promise<User | null>
}
