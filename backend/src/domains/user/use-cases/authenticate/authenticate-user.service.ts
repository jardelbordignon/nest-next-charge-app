import { Injectable } from '@nestjs/common'
import { UnauthorizedError } from '@/infra/errors'
import { Encrypter } from '@/infra/providers/cryptography/encrypter/encrypter'
import { Hasher } from '@/infra/providers/cryptography/hasher/hasher'
import { UserRepository } from '../../repositories/user.repository'

export type AuthenticateUserData = {
  email: string
  password: string
}

@Injectable()
export class AuthenticateUserService {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
    private encrypter: Encrypter,
  ) {}

  async execute({ email, password }: AuthenticateUserData) {
    const userFromEmail = await this.userRepository.findOne({ where: { email } })
    if (!userFromEmail) throw new UnauthorizedError('Email or password incorrect')

    const matchPassword = await this.hasher.compare(password, userFromEmail.password)
    if (!matchPassword) throw new UnauthorizedError('Email or password incorrect')

    const accessTokenPayload = {
      sub: userFromEmail.id,
      email: userFromEmail.email,
    }

    const accessToken = await this.encrypter.encrypt(accessTokenPayload)

    return { accessToken }
  }
}
