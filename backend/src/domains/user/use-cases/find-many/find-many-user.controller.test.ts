import { CREATE_USER_DATA } from 'test/utils'

describe('Find many user (E2E)', () => {
  beforeEach(async () => {
    const users = await global.api.get('/users')
    await Promise.all(
      users.body.map(async (user: any) => {
        await global.api.delete(`/users/${user.body.id}`)
      }),
    )
    await global.api.post('/users').send(CREATE_USER_DATA)
  })

  it('should be able to find many users', async () => {
    const response = await global.api.get('/users')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
