// https://docs.asaas.com/reference/criar-novo-cliente
export type CreateCustomerData = {
  name: string
  cpfCnpj: string
  email: string
  phone?: string
  mobilePhone: string
  address: string
  addressNumber: string
  complement?: string
  province: string
  postalCode: string
  externalReference: string
  notificationDisabled?: boolean
  additionalEmails?: string
  municipalInscription?: string
  stateInscription?: string
  observations?: string
  groupName?: string
  company?: string
  foreignCustomer?: boolean
}

export type CreateCustomerResponse = {
  object: string
  id: string
  dateCreated: string
  name: string
  email: string
  company: string | null
  phone: string
  mobilePhone: string
  address: string
  addressNumber: string
  complement: string
  province: string
  postalCode: string
  cpfCnpj: string
  personType: string
  deleted: false
  additionalEmails: string
  externalReference: string
  notificationDisabled: false
  observations: string
  municipalInscription: string
  stateInscription: string
  canDelete: boolean
  cannotBeDeletedReason: null
  canEdit: boolean
  cannotEditReason: null
  city: number
  cityName: string
  state: string
  country: string
}

// https://docs.asaas.com/reference/criar-nova-cobranca
type Split = {
  walletId: string // carteira Asaas que será transferido
  fixedValue?: number // valor fixo a ser transferido para a carteira
  percentualValue?: number // percentual sobre o valor líquido da cobrança a ser transferido
  totalFixedValue?: number
  externalReference: string
  description?: string
}

type Discount = {
  value: number
  dueDateLimitDays: number
  limitDate: string | null
  type: 'PERCENTAGE' | 'FIXED'
}

type Fine = {
  value: number // Percentual de multa sobre o valor da cobrança para pagamento após o vencimento
  type: 'PERCENTAGE' | 'FIXED'
}

export type CreatePaymentData = {
  customer: string
  billingType: 'BOLETO' | 'CREDIT_CARD' | 'PIX'
  value: number
  dueDate: string
  description: string
  externalReference: string
  daysAfterDueDateToRegistrationCancellation?: number // Dias após o vencimento para cancelamento do registro
  installmentCount?: number // Quantidade de parcelas
  totalValue?: number // valor total de uma cobrança que será parcelada
  installmentValue?: number // valor de cada parcela
  discount?: Discount
  interest?: {
    value: number //Percentual de juros ao mês sobre o valor da cobrança para pagamento após o vencimento
  }
  fine?: Fine // Informações de multa para pagamento após o vencimento
  postalService?: boolean // Se a cobrança será enviada via Correios
  splits?: Split[]
  callback?: { successUrl: null; autoRedirect: null }
}

type BillingType =
  | 'UNDEFINED'
  | 'BOLETO'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'TRANSFER'
  | 'DEPOSIT PIX'

type PaymentStatus =
  | 'PENDING'
  | 'RECEIVED'
  | 'CONFIRMED'
  | 'OVERDUE'
  | 'REFUNDED'
  | 'RECEIVED_IN_CASH'
  | 'REFUND_REQUESTED'
  | 'REFUND_IN_PROGRESS'
  | 'CHARGEBACK_REQUESTED'
  | 'CHARGEBACK_DISPUTE'
  | 'AWAITING_CHARGEBACK_REVERSAL'
  | 'DUNNING_REQUESTED'
  | 'DUNNING_RECEIVED'
  | 'AWAITING_RISK_ANALYSIS'
export type CreatePaymentResponse = {
  object: string
  id: string
  dateCreated: string
  customer: string
  paymentLink: null
  value: number
  netValue: number
  originalValue: null
  interestValue: null
  description: string
  billingType: BillingType
  canBePaidAfterDueDate: true
  pixTransaction: null
  status: PaymentStatus
  dueDate: string
  originalDueDate: string
  paymentDate: null
  clientPaymentDate: null
  installmentNumber: null
  invoiceUrl: string
  invoiceNumber: string
  externalReference: string
  deleted: boolean
  anticipated: boolean
  anticipable: boolean
  creditDate: null
  estimatedCreditDate: null
  transactionReceiptUrl: null
  nossoNumero: string
  bankSlipUrl: string
  lastInvoiceViewedDate: null
  lastBankSlipViewedDate: null
  discount: Discount
  fine: Fine
  interest: { value: number; type: string }
  postalService: boolean
  daysAfterDueDateToRegistrationCancellation: 1
  custody: null
  refunds: null
}

// https://docs.asaas.com/reference/obter-linha-digitavel-do-boleto
export type GetBoletoDataResponse = {
  identificationField: string
  nossoNumero: string
  barCode: string
}

// https://docs.asaas.com/reference/obter-qr-code-para-pagamentos-via-pix
export type GetPixDataResponse = {
  success: boolean
  encodedImage: string
  payload: string
  expirationDate: string
}
