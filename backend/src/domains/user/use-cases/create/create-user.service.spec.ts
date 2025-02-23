import { CREATE_USER_DATA } from 'test/utils'
import { ConflictError } from '@/infra/errors'
import { FakeHasher } from '@/infra/providers/cryptography/hasher/fake-hasher'
import { InMemoryUserRepository } from '../../repositories/in-memory.user.repository'
import { CreateUserService } from './create-user.service'

describe('Create user', () => {
  let userRepository: InMemoryUserRepository
  let hasher: FakeHasher
  let createUserService: CreateUserService

  beforeAll(() => {
    userRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()
    createUserService = new CreateUserService(userRepository, hasher)
  })

  beforeEach(async () => {
    userRepository.reset()
    await userRepository.create({ data: CREATE_USER_DATA })
  })

  it('should be able to create a new user', async () => {
    const email = 'joesmith@email.com'
    const fullName = 'Joe Smith'

    const createdUser = await createUserService.execute({
      ...CREATE_USER_DATA,
      email,
      fullName,
    })

    expect(createdUser.fullName).toBe(fullName)
    const users = await userRepository.findMany()
    expect(users.length).toBe(2)
  })

  it('should not be able to create a new user with an existing email', async () => {
    await expect(createUserService.execute(CREATE_USER_DATA)).rejects.toBeInstanceOf(
      ConflictError,
    )
  })
})
