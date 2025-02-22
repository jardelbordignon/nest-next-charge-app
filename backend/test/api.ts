import { INestApplication } from '@nestjs/common'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'

export type Api = TestAgent<supertest.Test>

let app: INestApplication

export async function startApi(): Promise<Api> {
  const testingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  app = testingModule.createNestApplication(new FastifyAdapter())
  await app.init()
  await app.getHttpAdapter().getInstance().ready()

  return supertest(app.getHttpServer())
}

export async function stopApi() {
  await app.close()
}
