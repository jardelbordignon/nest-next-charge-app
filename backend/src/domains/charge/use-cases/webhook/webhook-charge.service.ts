import { Injectable } from '@nestjs/common'
import { ChargeRepository } from '../../repositories/charge.repository'
import type { WebhookEvent } from './types'

type WebhookChargeServiceData = {
  event: WebhookEvent
}

@Injectable()
export class WebhookChargeService {
  constructor(private chargeRepository: ChargeRepository) {}

  async execute(data: WebhookChargeServiceData) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    switch (data.event) {
      case 'PAYMENT_CREATED':
        console.log('PAYMENT_CREATED')
        break
      case 'PAYMENT_RECEIVED':
        console.log('PAYMENT_RECEIVED')
        break
      default:
        console.log(`OTHER EVENT: ${data.event}`)
        return ''
    }
  }
}
