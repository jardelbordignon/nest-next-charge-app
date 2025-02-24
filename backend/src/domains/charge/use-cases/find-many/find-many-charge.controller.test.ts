import { CREATE_USER_DATA, getUserAuthorization } from 'test/utils'
import type { CreateChargeDto } from '../create/create-charge.service'

const CREATE_CHARGE_DATA: CreateChargeDto = {
  paymentMethod: 'BOLETO',
  amount: 100,
  description: 'Teste de cobrança',
}

describe('Find many charge (E2E)', () => {
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

  it('should be able to find many charges', async () => {
    CREATE_CHARGE_DATA.createdById = userA
    CREATE_CHARGE_DATA.receivedById = userB

    await global.api
      .post('/charges')
      .set('Authorization', authorization)
      .send(CREATE_CHARGE_DATA)

    await global.api
      .post('/charges')
      .set('Authorization', authorization)
      .send(CREATE_CHARGE_DATA)

    CREATE_CHARGE_DATA.createdById = userB
    CREATE_CHARGE_DATA.receivedById = userA

    await global.api
      .post('/charges')
      .set('Authorization', authorization)
      .send(CREATE_CHARGE_DATA)

    const response = await global.api
      .get('/charges')
      .set('Authorization', authorization)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      chargesPayable: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          // createdById: userA,
          // receivedById: userB,
          // createdAt: expect.any(String),
        }),
      ]),
      chargesReceivable: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          // createdById: userB,
          // receivedById: userA,
          // createdAt: expect.any(String),
        }),
      ]),
    })
  })
})
