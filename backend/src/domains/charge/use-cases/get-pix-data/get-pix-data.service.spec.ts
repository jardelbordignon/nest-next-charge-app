import { InMemoryPaymentProvider } from '@/infra/providers/payment/in-memory-payment'
import { GetPixDataService } from './get-pix-data.service'

describe('Get pix data', () => {
  let paymentProvider: InMemoryPaymentProvider
  let getPixDataService: GetPixDataService

  beforeAll(() => {
    paymentProvider = new InMemoryPaymentProvider()
    getPixDataService = new GetPixDataService(paymentProvider)
  })

  it('should be able to get pix data', async () => {
    const pixData = await getPixDataService.execute('payment-1')

    expect(pixData).toEqual({
      success: true,
      encodedImage: expect.any(String),
      payload: expect.any(String),
      expirationDate: expect.any(String),
    })
  })
})
