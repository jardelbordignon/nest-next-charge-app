import { Injectable } from '@nestjs/common'
import { NotFoundError } from '@/infra/errors'
import { UserRepository } from '../../repositories/user.repository'

@Injectable()
export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundError(`User with ${userId} id not found`)
    }

    return this.userRepository.delete(userId)
  }
}
