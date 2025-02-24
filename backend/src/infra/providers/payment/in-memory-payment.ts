/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'node:crypto'
import { sleep } from '@/infra/utils/helper-functions'
import { PaymentProvider } from './payment'
import type {
  CreateCustomerData,
  CreateCustomerResponse,
  CreatePaymentData,
  CreatePaymentResponse,
  GetBoletoDataResponse,
  GetPixDataResponse,
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

  async getBoletoData(paymentId: string): Promise<GetBoletoDataResponse> {
    await sleep()
    return {
      identificationField: '46191110000000000000010644547019110050000010000',
      nossoNumero: '10644547',
      barCode: '46191100500000100001110000000000001064454701',
    }
  }

  async getPixData(paymentId: string): Promise<GetPixDataResponse> {
    await sleep()

    return {
      success: true,
      encodedImage:
        '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',
      payload:
        '00020101021226820014br.gov.bcb.pix2560qrpix-h.bradesco.com.br/9d36b84f-c70b-478f-b95c-12729b90ca255204000053039865406100.005802BR5905ASAAS6009JOINVILLE62070503***6304474A',
      expirationDate: new Date().toISOString().replace('T', ' ').replace('Z', ''),
    }
  }
}
