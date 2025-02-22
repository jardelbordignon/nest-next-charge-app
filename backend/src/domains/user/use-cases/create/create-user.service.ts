import { Injectable } from '@nestjs/common'
import { ConflictError } from '@/infra/errors'
import { Hasher } from '@/infra/providers/cryptography/hasher/hasher'
import {
  type CreateUserArgs,
  UserRepository,
} from '../../repositories/user.repository'
import { UserEntity } from '../../user.entity'

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute(data: CreateUserArgs['data']): Promise<UserEntity> {
    const { email, fullName, password } = data

    const userWithSameEmail = await this.userRepository.findOne({ where: { email } })

    if (userWithSameEmail) {
      throw new ConflictError(`User with ${email} email address already exists`)
    }

    const user = await this.userRepository.create({
      data: {
        email,
        fullName,
        password: await this.hasher.hash(password),
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}
