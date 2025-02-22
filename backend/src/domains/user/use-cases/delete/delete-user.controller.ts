import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NotFoundError } from '@/infra/errors'
import { DeleteUserService } from './delete-user.service'

@ApiTags('User')
@Controller('/users')
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete an user',
    description: 'Delete an user by ID',
  })
  @ApiResponse({ description: 'User deleted successfully', status: 204 })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User with abc123 id not found',
        },
        error: {
          type: 'string',
          example: 'Not Found',
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
      },
    },
  })
  @Delete('/:userId')
  async handle(@Param('userId') userId: string): Promise<void> {
    try {
      await this.deleteUserService.execute(userId)
      return
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
