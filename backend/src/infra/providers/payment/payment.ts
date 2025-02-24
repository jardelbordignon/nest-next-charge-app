import type {
  CreateCustomerData,
  CreateCustomerResponse,
  CreatePaymentData,
  CreatePaymentResponse,
  GetBoletoDataResponse,
  GetPixDataResponse,
} from './types'

export abstract class PaymentProvider {
  abstract createCustomer(data: CreateCustomerData): Promise<CreateCustomerResponse>
  abstract createPayment(data: CreatePaymentData): Promise<CreatePaymentResponse>
  abstract getBoletoData(paymentId: string): Promise<GetBoletoDataResponse>
  abstract getPixData(paymentId: string): Promise<GetPixDataResponse>
}
