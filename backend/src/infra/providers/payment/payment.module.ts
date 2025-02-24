import { Module } from '@nestjs/common'
import { AsaasPaymentProvider } from './asaas-payment'
import { PaymentProvider } from './payment'

@Module({
  exports: [PaymentProvider],
  providers: [{ provide: PaymentProvider, useClass: AsaasPaymentProvider }],
})
export class PaymentProviderModule {}
