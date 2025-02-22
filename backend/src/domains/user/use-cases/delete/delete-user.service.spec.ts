import { NotFoundError } from '@/infra/errors'
import { InMemoryUserRepository } from '../../repositories/in-memory.user.repository'
import { DeleteUserService } from './delete-user.service'

let userRepository: InMemoryUserRepository
let deleteUserService: DeleteUserService

const email = 'johndoe@email.com'

describe('Delete user', () => {
  beforeAll(() => {
    userRepository = new InMemoryUserRepository()
    deleteUserService = new DeleteUserService(userRepository)
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

  it('should be able to delete an user', async () => {
    let users = await userRepository.findMany()
    expect(users.length).toBe(1)

    await deleteUserService.execute(users[0].id)

    users = await userRepository.findMany()
    expect(users.length).toBe(0)
  })

  it('should not be able to delete an user with an invalid id', async () => {
    await expect(deleteUserService.execute('invalid-id')).rejects.toThrow(
      new NotFoundError('User with invalid-id id not found'),
    )
  })
})
