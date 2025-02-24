import { Injectable } from '@nestjs/common'
import { PaymentProvider } from '@/infra/providers/payment/payment'

@Injectable()
export class GetPixDataService {
  constructor(private paymentProvider: PaymentProvider) {}

  async execute(paymentId: string) {
    return this.paymentProvider.getPixData(paymentId)
  }
}
