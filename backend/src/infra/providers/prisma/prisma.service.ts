/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger(PrismaService.name)
  private isConnected = false

  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'production'
          ? ['warn', 'error']
          : ['warn', 'error', 'query', 'info'],
    })
  }

  async onModuleInit() {
    this.logger.log('initialized')
    try {
      await this.$connect()
      this.isConnected = true
      this.logger.log('Prisma connection established successfully')
    } catch (error) {
      this.logger.error('Failed to establish Prisma connection:', error)
      throw error
    }
  }

  async onModuleDestroy() {
    this.logger.log('destroying...')
    if (this.isConnected) {
      try {
        await this.$disconnect()
        this.isConnected = false
        this.logger.log('Prisma connection closed successfully')
      } catch (error) {
        this.logger.error('Failed to close Prisma connection:', error)
      }
    }
  }

  public checkConnectionStatus(): boolean {
    return this.isConnected
  }
}
