import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { EnvService } from './infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  const port = app.get(EnvService).get('PORT')
  const environment = app.get(EnvService).get('NODE_ENV')
  const logger = new Logger('Bootstrap')

  app.enableCors()

  if (environment !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Node Pay')
      .setDescription('The NodeJS Pay api documentation')
      .setVersion('0.1')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('doc', app, document, {
      swaggerOptions: {
        apisSorter: 'alpha',
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
      },
    })
  }

  await app
    .listen(port, '0.0.0.0')
    .then(async () => {
      global.apiHost = await app.getUrl()
      logger.log(`🚀 Server is running on: ${global.apiHost}`)
    })
    .catch(error => logger.error(`❌ Server starts error: ${error}`))
}

void bootstrap()
