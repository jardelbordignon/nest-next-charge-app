import { CREATE_USER_DATA } from 'test/utils'

describe('Create user (E2E)', () => {
  beforeEach(async () => {
    const users = await global.api.get('/users')
    await Promise.all(
      users.body
        .filter(item => !!item.body)
        .map(async (user: any) => {
          await global.api.delete(`/users/${user.body.id}`)
        }),
    )
  })

  it('should be able to create an user', async () => {
    const response = await global.api.post('/users').send(CREATE_USER_DATA)
    expect(response.statusCode).toBe(201)
  })

  it('should not be able to create an user with an existing email', async () => {
    await global.api.post('/users').send(CREATE_USER_DATA)
    const response = await global.api.post('/users').send(CREATE_USER_DATA)
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toEqual(
      `User with ${CREATE_USER_DATA.email} email address already exists`,
    )
  })
})
