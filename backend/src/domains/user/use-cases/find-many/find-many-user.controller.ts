import { BadRequestException, Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from '../../user.entity'
import { FindManyUserService } from './find-many-user.service'

@ApiTags('User')
@Controller('/users')
export class FindManyUserController {
  constructor(private findManyUserService: FindManyUserService) {}

  @ApiOperation({
    summary: 'Find many users',
    description: 'Find many users',
  })
  @ApiResponse({
    status: 200,
    description: 'Users found',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'user-123',
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
  async handle(): Promise<UserEntity[]> {
    try {
      return await this.findManyUserService.execute()
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message)
      }
      throw new BadRequestException('Unknown error')
    }
  }
}
