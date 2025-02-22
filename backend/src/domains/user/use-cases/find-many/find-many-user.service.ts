import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repositories/user.repository'
import { UserEntity } from '../../user.entity'

@Injectable()
export class FindManyUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userRepository.findMany()
    const usersWithoutPassword = users.map(user => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return usersWithoutPassword
  }
}
