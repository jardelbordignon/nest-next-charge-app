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
import { CreateUserArgs } from '../../repositories/user.repository'
import { CreateUserService } from './create-user.service'

const zCreateUserData: ZodObj<CreateUserArgs['data']> = z.object({
  email: z.string().openapi({ example: 'john-doe@email.com' }),
  fullName: z.string().openapi({ example: 'John Doe' }),
  password: z.string().openapi({ example: 'Pwd@123' }),
})

@ApiTags('User')
@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @ValidateAndDocumentBody(zCreateUserData, { summary: 'Create User' })
  @ApiResponse({ description: 'User created successfully', status: 201 })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User with john.doe@email.com email address already exists.',
        },
        error: {
          type: 'string',
          example: 'Conflict',
        },
        statusCode: {
          type: 'number',
          example: 409,
        },
      },
    },
  })
  @Post()
  async handle(@Body() body: CreateUserArgs['data']): Promise<void> {
    try {
      await this.createUserService.execute(body)
      return
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
