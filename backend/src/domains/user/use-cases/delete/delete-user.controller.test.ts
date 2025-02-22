import { CREATE_USER_DATA } from 'test/utils'

describe('Delete user (E2E)', () => {
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

  it('should be able to delete an user', async () => {
    const getUsers = await global.api
      .get('/users')
      .set('Authorization', authorization)
      .send()
    const deleteUser = await global.api
      .delete(`/users/${getUsers.body[0].id}`)
      .set('Authorization', authorization)
      .send()
    expect(deleteUser.statusCode).toBe(204)
  })
})
