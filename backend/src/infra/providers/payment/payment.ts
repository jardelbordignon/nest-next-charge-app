import type {
  CreateCustomerData,
  CreateCustomerResponse,
  CreatePaymentData,
  CreatePaymentResponse,
} from './types'

export abstract class PaymentProvider {
  abstract createCustomer(data: CreateCustomerData): Promise<CreateCustomerResponse>
  abstract createPayment(data: CreatePaymentData): Promise<CreatePaymentResponse>
}
