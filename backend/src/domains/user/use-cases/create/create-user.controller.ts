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
import { AllowUnauthenticated } from '@/infra/providers/authentication/authentication.guard'
import { CreateUserArgs } from '../../repositories/user.repository'
import { CreateUserService } from './create-user.service'

const zCreateUserData: ZodObj<CreateUserArgs['data']> = z.object({
  email: z.string().openapi({ example: 'john-doe@email.com' }),
  fullName: z.string().openapi({ example: 'John Doe' }),
  password: z.string().openapi({ example: 'Pwd@123' }),
  address: z.string().openapi({ example: 'Rua Parecis' }),
  addressNumber: z.string().openapi({ example: '170' }),
  addressComplement: z.string().openapi({ example: 'Esquina com Tupiniquins' }),
  document: z.string().openapi({ example: '24971563792' }),
  phone: z.string().openapi({ example: '54991307936' }),
  postalCode: z.string().openapi({ example: '99500-000' }),
  province: z.string().openapi({ example: 'Rio Grande do Sul' }),
})

@AllowUnauthenticated()
@ApiTags('User')
@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @ValidateAndDocumentBody(zCreateUserData, { summary: 'Create an user' })
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
