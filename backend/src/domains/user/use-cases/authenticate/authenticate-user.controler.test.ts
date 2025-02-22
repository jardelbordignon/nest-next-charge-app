import { CREATE_USER_DATA } from 'test/utils'

describe('Authenticate user (E2E)', () => {
  beforeAll(async () => {
    await global.api.post('/users').send(CREATE_USER_DATA)
  })

  const { email, password } = CREATE_USER_DATA

  it('should be able to authenticate an user', async () => {
    const response = await global.api
      .post('/users/authenticate')
      .send({ email, password })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('accessToken')
  })

  it('should not be able to authenticate an user with a invalid email', async () => {
    const response = await global.api
      .post('/users/authenticate')
      .send({ email: 'invalid@email.com', password })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toEqual('Email or password incorrect')
  })

  it('should not be able to authenticate an user with a invalid password', async () => {
    const response = await global.api
      .post('/users/authenticate')
      .send({ email, password: 'invalid' })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toEqual('Email or password incorrect')
  })
})
