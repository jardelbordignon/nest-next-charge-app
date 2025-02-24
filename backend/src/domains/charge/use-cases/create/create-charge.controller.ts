import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ConflictError } from '@/infra/errors'
import { ValidateAndDocumentBody, type ZodObj, z } from '@/infra/pipes/zod.pipe'
import { type CreateChargeDto, CreateChargeService } from './create-charge.service'
import type { Charge } from '@prisma/client'

const zCreateChargeData: ZodObj<CreateChargeDto> = z.object({
  paymentMethod: z.enum(['CREDIT_CARD', 'BOLETO', 'PIX']).openapi({ example: 'PIX' }),
  amount: z.number().positive().openapi({ example: 100 }),
  description: z.string().min(1).openapi({ example: 'Compra do equipamento' }),
  createdById: z.string().uuid().openapi({ example: 'seller-uuid' }),
  receivedById: z.string().uuid().openapi({ example: 'customer-uuid' }),
})

@ApiTags('Charge')
@Controller('/charges')
export class CreateChargeController {
  constructor(private createChargeService: CreateChargeService) {}

  @ValidateAndDocumentBody(zCreateChargeData, { summary: 'Create an charge' })
  @ApiResponse({ description: 'Charge created successfully', status: 201 })
  @Post()
  async handle(@Body() body: CreateChargeDto): Promise<Charge> {
    try {
      return this.createChargeService.execute(body)
    } catch (error) {
      if (error instanceof Error) {
        switch (error.constructor) {
          case ConflictError:
            throw new ConflictException(error.message)
          default:
            throw new BadRequestException(error.message)
        }
      }
    }
    throw new BadRequestException('Unknown error')
  }
}
