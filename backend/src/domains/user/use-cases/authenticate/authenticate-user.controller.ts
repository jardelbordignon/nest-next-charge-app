import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { UnauthorizedError } from '@/infra/errors'
import { ValidateAndDocumentBody, type ZodObj, z } from '@/infra/pipes/zod.pipe'
import { AllowUnauthenticated } from '@/infra/providers/authentication/authentication.guard'
import {
  type AuthenticateUserData,
  AuthenticateUserService,
} from './authenticate-user.service'

const zAuthenticateUserData: ZodObj<AuthenticateUserData> = z.object({
  email: z.string().openapi({ example: 'john-doe@email.com' }),
  password: z.string().openapi({ example: 'Pwd@123' }),
})

@AllowUnauthenticated()
@ApiTags('User')
@Controller('/users')
export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @ValidateAndDocumentBody(zAuthenticateUserData, {
    summary: 'Authenticate an user',
    exampleErrorField: 'email',
  })
  @HttpCode(200)
  @ApiResponse({
    description: 'User authenticated successfully',
    status: 200,
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example: 'json.web.token',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Wrong credentials',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Email or password incorrect',
        },
        error: {
          type: 'string',
          example: 'Unauthorized',
        },
        statusCode: {
          type: 'number',
          example: 401,
        },
      },
    },
  })
  @Post('/authenticate')
  async handle(@Body() body: AuthenticateUserData) {
    try {
      const result = await this.authenticateUserService.execute(body)
      return result
    } catch (error) {
      if (error instanceof Error) {
        switch (error.constructor) {
          case UnauthorizedError:
            throw new UnauthorizedException(error.message)
          default:
            throw new BadRequestException(error.message)
        }
      }
    }
    throw new BadRequestException('Unknown error')
  }
}
