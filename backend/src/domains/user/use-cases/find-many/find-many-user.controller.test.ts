import { CREATE_USER_DATA } from 'test/utils'

describe('Find many user (E2E)', () => {
  let authorization: string

  beforeAll(async () => {
    await global.api.post('/users').send(CREATE_USER_DATA)
    const postUsersAuthenticate = await global.api
      .post('/users/authenticate')
      .send(CREATE_USER_DATA)
    authorization = `Bearer ${postUsersAuthenticate.body.accessToken}`
  })

  beforeEach(async () => {
    const getUsers = await global.api
      .get('/users')
      .set('Authorization', authorization)
      .send()

    if (getUsers.body.length) {
      await Promise.all(
        getUsers.body
          .filter(user => user?.email !== CREATE_USER_DATA.email)
          .map(async (user: any) => {
            await global.api
              .delete(`/users/${user.body.id}`)
              .set('Authorization', authorization)
              .send()
          }),
      )
    }
  })

  it('should be able to find many users', async () => {
    const response = await global.api
      .get('/users')
      .set('Authorization', authorization)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
