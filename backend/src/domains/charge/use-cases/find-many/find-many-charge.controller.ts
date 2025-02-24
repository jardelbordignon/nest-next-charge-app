import { BadRequestException, Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '@/infra/providers/authentication/current-user.decorator'
import { FindManyChargeService } from './find-many-charge.service'

@ApiTags('Charge')
@Controller('/charges')
export class FindManyChargeController {
  constructor(private findManyChargeService: FindManyChargeService) {}

  @ApiOperation({
    summary: 'Find many charges',
    description: 'Find many charges',
  })
  @ApiResponse({
    status: 200,
    description: 'Charges found',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'charge-123',
          },
          email: {
            type: 'string',
            example: 'john-doe@email.com',
          },
          fullName: {
            type: 'string',
            example: 'John Doe',
          },
        },
      },
    },
  })
  @Get()
  async handle(@CurrentUser('sub') userId: string) {
    try {
      const [chargesReceivable, chargesPayable] = await Promise.all([
        this.findManyChargeService.execute({
          where: { createdById: userId },
        }),
        this.findManyChargeService.execute({
          where: { receivedById: userId },
        }),
      ])

      return { chargesReceivable, chargesPayable }
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message)
      }
      throw new BadRequestException('Unknown error')
    }
  }
}
