import { UnauthorizedError } from '@/infra/errors'
import { FakeEncrypter } from '@/infra/providers/cryptography/encrypter/fake-encrypter'
import { FakeHasher } from '@/infra/providers/cryptography/hasher/fake-hasher'
import { InMemoryUserRepository } from '../../repositories/in-memory.user.repository'
import { AuthenticateUserService } from './authenticate-user.service'

let userRepository: InMemoryUserRepository
let hasher: FakeHasher
let encrypter: FakeEncrypter
let authenticateUserService: AuthenticateUserService

let hashedPassword: string
const password = 'Pwd@123'
const email = 'johndoe@email.com'

describe('Authenticate user', () => {
  beforeAll(async () => {
    userRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    authenticateUserService = new AuthenticateUserService(
      userRepository,
      hasher,
      encrypter,
    )

    hashedPassword = await hasher.hash(password)
  })

  beforeEach(async () => {
    userRepository.reset()
    await userRepository.create({
      data: {
        email,
        fullName: 'John Doe',
        password: hashedPassword,
      },
    })
  })

  it('should be able to authenticate an use', async () => {
    const result = await authenticateUserService.execute({ email, password })
    expect(result).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate an user with an invalid email', async () => {
    await expect(
      authenticateUserService.execute({ email: 'invalid@email.com', password }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('should not be able to authenticate an user with a invalid password', async () => {
    await expect(
      authenticateUserService.execute({ email, password: 'invalid-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
