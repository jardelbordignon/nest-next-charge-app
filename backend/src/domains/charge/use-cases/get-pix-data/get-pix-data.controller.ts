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
import type { GetPixDataResponse } from '@/infra/providers/payment/types'
import { GetPixDataService } from './get-pix-data.service'

@ApiTags('Charge')
@Controller('/charges')
export class GetPixDataController {
  constructor(private getPixDataService: GetPixDataService) {}

  @HttpCode(200)
  @Get('/:paymentId/pix-data')
  async handle(@Param('paymentId') paymentId: string): Promise<GetPixDataResponse> {
    try {
      return await this.getPixDataService.execute(paymentId)
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
