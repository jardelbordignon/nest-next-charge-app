import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllowUnauthenticated } from '@/infra/providers/authentication/authentication.guard'
import { WebhookChargeService } from './webhook-charge.service'
import type { WebhookEvent } from './types'

type WebhookChargeControllerBody = {
  event: WebhookEvent
}

@AllowUnauthenticated()
@ApiTags('Charge')
@Controller('/charges')
export class WebhookChargeController {
  constructor(private webhookChargeService: WebhookChargeService) {}

  //@ValidateAndDocumentBody(zCreateChargeData, { summary: 'Create an charge' })
  @ApiResponse({
    description: 'Charge webhook',
    status: 200,
    schema: {},
  })
  @HttpCode(200)
  @Post('/webhook')
  async handle(
    @Body() body: WebhookChargeControllerBody,
  ): Promise<{ received: true }> {
    await this.webhookChargeService.execute(body)

    return { received: true }
  }
}
