import { CREATE_USER_DATA, getUserAuthorization } from 'test/utils'
import { CreateChargeDto } from './create-charge.service'

const CREATE_CHARGE_DATA: CreateChargeDto = {
  paymentMethod: 'BOLETO',
  amount: 100,
  description: 'Teste de cobrança',
}

describe('Create charge (E2E)', () => {
  let authorization: string
  let userA: string
  let userB: string

  beforeAll(async () => {
    authorization = await getUserAuthorization()

    await global.api.post('/users').send({
      ...CREATE_USER_DATA,
      fullName: 'Joe Doe',
      email: 'joedoe@email.com',
    })

    const users = await global.api
      .get('/users')
      .set('Authorization', authorization)
      .send()

    userA = users.body[0].id
    userB = users.body[1].id
  })

  it('should be able to create an charge', async () => {
    CREATE_CHARGE_DATA.createdById = userA
    CREATE_CHARGE_DATA.receivedById = userB

    const response = await global.api
      .post('/charges')
      .set('Authorization', authorization)
      .send(CREATE_CHARGE_DATA)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdById: userA,
        receivedById: userB,
        createdAt: expect.any(String),
      }),
    )
  })
})
