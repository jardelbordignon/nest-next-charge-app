import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { NotFoundError } from '@/infra/errors'
import type { GetBoletoDataResponse } from '@/infra/providers/payment/types'
import { GetBoletoDataService } from './get-boleto-data.service'

@ApiTags('Charge')
@Controller('/charges')
export class GetBoletoDataController {
  constructor(private getBoletoDataService: GetBoletoDataService) {}

  @HttpCode(200)
  @Get('/:paymentId/boleto-data')
  async handle(
    @Param('paymentId') paymentId: string,
  ): Promise<GetBoletoDataResponse> {
    try {
      return await this.getBoletoDataService.execute(paymentId)
    } catch (error) {
      if (error instanceof Error) {
        switch (error.constructor) {
          case NotFoundError:
            throw new NotFoundException(error.message)
          default:
            throw new BadRequestException(error.message)
        }
      }
    }
    throw new BadRequestException('Unknown error')
  }
}
