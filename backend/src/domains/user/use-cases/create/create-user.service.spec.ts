import { ConflictError } from '@/infra/errors'
import { FakeHasher } from '@/infra/providers/cryptography/hasher/fake-hasher'
import { InMemoryUserRepository } from '../../repositories/in-memory.user.repository'
import { CreateUserService } from './create-user.service'

let userRepository: InMemoryUserRepository
let hasher: FakeHasher
let createUserService: CreateUserService

let password: string
const passwordData = 'Pwd@123'
const email = 'johndoe@email.com'

describe('Create user', () => {
  beforeAll(async () => {
    userRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()
    createUserService = new CreateUserService(userRepository, hasher)

    password = await hasher.hash(passwordData)
  })

  beforeEach(async () => {
    userRepository.reset()
    await userRepository.create({
      data: {
        email,
        fullName: 'John Doe',
        password,
      },
    })
  })

  it('should be able to create a new user', async () => {
    const email = 'joesmith@email.com'
    const fullName = 'Joe Smith'

    const createdUser = await createUserService.execute({ email, fullName, password })

    expect(createdUser.fullName).toBe(fullName)
    const users = await userRepository.findMany()
    expect(users.length).toBe(2)
  })

  it('should not be able to create a new user with an existing email', async () => {
    await expect(
      createUserService.execute({ email, fullName: 'John Doe', password }),
    ).rejects.toBeInstanceOf(ConflictError)
  })
})
