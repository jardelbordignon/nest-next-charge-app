import { CreateUserArgs } from '@/domains/user/repositories/user.repository'

export const CREATE_USER_DATA: CreateUserArgs['data'] = {
  email: 'joe.smith@email.com',
  fullName: 'Joe Smith',
  password: 'Pwd@123',
}

describe('Create user (E2E)', () => {
  it('should be able to create an user', async () => {
    const response = await global.api.post('/users').send(CREATE_USER_DATA)
    expect(response.statusCode).toBe(201)
  })

  // it('should not be able to create an user with an existing email', async () => {
  //   const userData = {
  //     email: 'jessie@email.com',
  //     name: 'Jessie Doe',
  //     password,
  //   }

  //   await global.api.post('/users').send(userData)
  //   const response = await global.api.post('/users').send(userData)

  //   expect(response.statusCode).toBe(409)
  //   expect(response.body).toEqual({
  //     error: 'CONFLICT',
  //     message: `User with ${userData.email} email address already exists.`,
  //     statusCode: 409,
  //   })
  // })
})
