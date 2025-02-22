import { CREATE_USER_DATA } from 'test/utils'

describe('Delete user (E2E)', () => {
  beforeEach(async () => {
    const users = await global.api.get('/users')
    await Promise.all(
      users.body.map(async (user: any) => {
        await global.api.delete(`/users/${user.body.id}`)
      }),
    )
    await global.api.post('/users').send(CREATE_USER_DATA)
  })

  it('should be able to delete an user', async () => {
    const users = await global.api.get('/users')
    const response = await global.api.delete(`/users/${users.body[0].id}`)
    expect(response.statusCode).toBe(204)
  })
})
