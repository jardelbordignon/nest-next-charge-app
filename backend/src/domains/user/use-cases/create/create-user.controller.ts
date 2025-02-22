import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { ConflictError } from '@/infra/errors'
import { CreateUserService } from './create-user.service'
import type { CreateUserArgs } from '../../repositories/user.repository'

@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}
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
