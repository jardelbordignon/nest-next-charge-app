export type WebhookEvent =
  | 'PAYMENT_CREDIT_CARD_CAPTURE_REFUSED'
  | 'PAYMENT_CHECKOUT_VIEWED'
  | 'PAYMENT_BANK_SLIP_VIEWED'
  | 'PAYMENT_DUNNING_REQUESTED'
  | 'PAYMENT_DUNNING_RECEIVED'
  | 'PAYMENT_AWAITING_CHARGEBACK_REVERSAL'
  | 'PAYMENT_CHARGEBACK_DISPUTE'
  | 'PAYMENT_CHARGEBACK_REQUESTED'
  | 'PAYMENT_RECEIVED_IN_CASH_UNDONE'
  | 'PAYMENT_REFUND_IN_PROGRESS'
  | 'PAYMENT_REFUNDED'
  | 'PAYMENT_RESTORED'
  | 'PAYMENT_DELETED'
  | 'PAYMENT_OVERDUE'
  | 'PAYMENT_ANTICIPATED'
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_CONFIRMED'
  | 'PAYMENT_UPDATED'
  | 'PAYMENT_CREATED'
  | 'PAYMENT_REPROVED_BY_RISK_ANALYSIS'
  | 'PAYMENT_APPROVED_BY_RISK_ANALYSIS'
  | 'PAYMENT_AWAITING_RISK_ANALYSIS'
  | 'PAYMENT_AUTHORIZED'
