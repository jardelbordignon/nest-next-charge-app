import { CREATE_USER_DATA } from 'test/utils'
import { InMemoryUserRepository } from '../../repositories/in-memory.user.repository'
import { FindManyUserService } from './find-many-user.service'

describe('Delete user', () => {
  let userRepository: InMemoryUserRepository
  let findManyUserService: FindManyUserService

  beforeAll(() => {
    userRepository = new InMemoryUserRepository()
    findManyUserService = new FindManyUserService(userRepository)
  })

  beforeEach(async () => {
    userRepository.reset()
    await userRepository.create({ data: CREATE_USER_DATA })
  })

  it('should be able to find many users', async () => {
    let users = await findManyUserService.execute()
    expect(users.length).toBe(1)

    await userRepository.create({
      data: {
        ...CREATE_USER_DATA,
        email: 'jane.doe@email.com',
        fullName: 'Jane Doe',
      },
    })

    users = await findManyUserService.execute()
    expect(users.length).toBe(2)
  })
})
