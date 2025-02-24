import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { NotFoundError } from '@/infra/errors'
import { ValidateAndDocumentBody, type ZodObj, z } from '@/infra/pipes/zod.pipe'
import { CurrentUser } from '@/infra/providers/authentication/current-user.decorator'
import { type CreateChargeDto, CreateChargeService } from './create-charge.service'
import type { Charge } from '@prisma/client'

type CreateChargeBody = Omit<CreateChargeDto, 'createdById' | 'invoiceUrl'>

const zCreateChargeData: ZodObj<CreateChargeBody> = z.object({
  paymentMethod: z.enum(['CREDIT_CARD', 'BOLETO', 'PIX']).openapi({ example: 'PIX' }),
  amount: z.number().positive().openapi({ example: 100 }),
  description: z.string().min(1).openapi({ example: 'Compra do equipamento' }),
  receivedById: z.string().uuid().openapi({ example: 'customer-uuid' }),
})

@ApiTags('Charge')
@Controller('/charges')
export class CreateChargeController {
  constructor(private createChargeService: CreateChargeService) {}

  @ValidateAndDocumentBody(zCreateChargeData, { summary: 'Create an charge' })
  @ApiResponse({
    description: 'Charge created successfully',
    status: 200,
    schema: {},
  })
  @HttpCode(200)
  @Post()
  async handle(
    @CurrentUser('sub') userId: string,
    @Body() body: CreateChargeBody,
  ): Promise<Charge> {
    try {
      return await this.createChargeService.execute({
        ...body,
        createdById: userId,
      })
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
