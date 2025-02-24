import { randomUUID } from 'node:crypto'
import { sleep } from '@/infra/utils/helper-functions'
import { PaymentProvider } from './payment'
import type {
  CreateCustomerData,
  CreateCustomerResponse,
  CreatePaymentData,
  CreatePaymentResponse,
} from './types'

const dateCreated = new Date().toISOString().split('T')[0]

export class InMemoryPaymentProvider implements PaymentProvider {
  async createCustomer(data: CreateCustomerData): Promise<CreateCustomerResponse> {
    await sleep()
    const {
      name,
      cpfCnpj,
      email,
      phone,
      mobilePhone,
      address,
      addressNumber,
      complement,
      province,
      postalCode,
      externalReference,
    } = data
    const newCustomer: CreateCustomerResponse = {
      id: `cus_${randomUUID()}`,
      name,
      cpfCnpj,
      email,
      phone: phone || '',
      mobilePhone,
      address,
      addressNumber,
      complement: complement || '',
      province,
      postalCode,
      externalReference,
      object: 'customer',
      dateCreated,
      company: null,
      personType: 'FISICA',
      deleted: false,
      additionalEmails: 'john.doe@asaas.com,john.doe.silva@asaas.com.br',
      notificationDisabled: false,
      observations: 'ótimo pagador, nenhum problema até o momento',
      municipalInscription: '46683695908',
      stateInscription: '646681195275',
      canDelete: true,
      cannotBeDeletedReason: null,
      canEdit: true,
      cannotEditReason: null,
      city: 15873,
      cityName: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
    }

    return newCustomer
  }

  async createPayment(data: CreatePaymentData): Promise<CreatePaymentResponse> {
    await sleep()

    const { customer, billingType, value, dueDate, description, externalReference } =
      data

    const newPayment: CreatePaymentResponse = {
      object: 'payment',
      id: `pay_${randomUUID()}`,
      dateCreated,
      customer,
      paymentLink: null,
      value,
      netValue: value,
      originalValue: null,
      interestValue: null,
      description,
      billingType: billingType as any,
      canBePaidAfterDueDate: true,
      pixTransaction: null,
      status: 'PENDING',
      dueDate,
      originalDueDate: dateCreated,
      paymentDate: null,
      clientPaymentDate: null,
      installmentNumber: null,
      invoiceUrl: 'https://sandbox.asaas.com/i/833w0cgfang6p04m',
      invoiceNumber: '07744583',
      externalReference,
      deleted: false,
      anticipated: false,
      anticipable: false,
      creditDate: null,
      estimatedCreditDate: null,
      transactionReceiptUrl: null,
      nossoNumero: '10643337',
      bankSlipUrl: 'https://sandbox.asaas.com/b/pdf/833w0cgfang6p04m',
      lastInvoiceViewedDate: null,
      lastBankSlipViewedDate: null,
      discount: { value: 0, limitDate: null, dueDateLimitDays: 0, type: 'FIXED' },
      fine: { value: 0, type: 'FIXED' },
      interest: { value: 0, type: 'PERCENTAGE' },
      postalService: false,
      daysAfterDueDateToRegistrationCancellation: 1,
      custody: null,
      refunds: null,
    }

    return newPayment
  }
}
