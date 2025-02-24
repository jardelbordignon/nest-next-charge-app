import { Injectable } from '@nestjs/common'
import { PaymentProvider } from '@/infra/providers/payment/payment'

@Injectable()
export class GetBoletoDataService {
  constructor(private paymentProvider: PaymentProvider) {}

  async execute(paymentId: string) {
    return this.paymentProvider.getBoletoData(paymentId)
  }
}
