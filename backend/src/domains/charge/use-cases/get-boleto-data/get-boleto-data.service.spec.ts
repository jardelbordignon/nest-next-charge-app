import { InMemoryPaymentProvider } from '@/infra/providers/payment/in-memory-payment'
import { GetBoletoDataService } from './get-boleto-data.service'

describe('Get boleto data', () => {
  let paymentProvider: InMemoryPaymentProvider
  let getBoletoDataService: GetBoletoDataService

  beforeAll(() => {
    paymentProvider = new InMemoryPaymentProvider()
    getBoletoDataService = new GetBoletoDataService(paymentProvider)
  })

  it('should be able to get boleto data', async () => {
    const boletoData = await getBoletoDataService.execute('payment-1')

    expect(boletoData).toEqual({
      barCode: expect.any(String),
      identificationField: expect.any(String),
      nossoNumero: expect.any(String),
    })
  })
})
