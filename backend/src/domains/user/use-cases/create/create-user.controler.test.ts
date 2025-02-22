import { CREATE_USER_DATA } from 'test/utils'

describe('Create user (E2E)', () => {
  beforeAll(async () => {
    await global.api.post('/users').send(CREATE_USER_DATA)
  })

  it('should be able to create an user', async () => {
    const response = await global.api.post('/users').send({
      ...CREATE_USER_DATA,
      email: 'teste@teste.com',
    })
    expect(response.statusCode).toBe(201)
  })

  it('should not be able to create an user with an existing email', async () => {
    const response = await global.api.post('/users').send(CREATE_USER_DATA)
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toEqual(
      `User with ${CREATE_USER_DATA.email} email address already exists`,
    )
  })
})
