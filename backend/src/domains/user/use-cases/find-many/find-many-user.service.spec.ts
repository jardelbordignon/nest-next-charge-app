import { InMemoryUserRepository } from '../../repositories/in-memory.user.repository'
import { FindManyUserService } from './find-many-user.service'

let userRepository: InMemoryUserRepository
let findManyUserService: FindManyUserService

const email = 'johndoe@email.com'

describe('Delete user', () => {
  beforeAll(() => {
    userRepository = new InMemoryUserRepository()
    findManyUserService = new FindManyUserService(userRepository)
  })

  beforeEach(async () => {
    userRepository.reset()
    await userRepository.create({
      data: {
        email,
        fullName: 'John Doe',
        password: 'Pwd@123',
      },
    })
  })

  it('should be able to find many users', async () => {
    let users = await findManyUserService.execute()
    expect(users.length).toBe(1)

    await userRepository.create({
      data: {
        email: 'jane.doe@email.com',
        fullName: 'Jane Doe',
        password: 'Pwd@123',
      },
    })

    users = await findManyUserService.execute()
    expect(users.length).toBe(2)
  })
})
