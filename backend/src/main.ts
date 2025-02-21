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

  const logger = new Logger('Bootstrap')
  const port = app.get(EnvService).get('PORT')
  const environment = app.get(EnvService).get('NODE_ENV')

  const notInProduction = environment !== 'production'

  if (notInProduction) {
    let config = new DocumentBuilder()
      .setTitle('Node Pay')
      .setDescription('The NodeJS Pay API documentation')
      .setVersion('0.1')

    if (environment === 'development') {
      config = config.addBearerAuth()
    }

    const document = SwaggerModule.createDocument(app, config.build())
    SwaggerModule.setup('doc', app, document, {
      swaggerOptions: {
        apisSorter: 'alpha',
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
      },
    })
  }

  app.enableCors()

  await app
    .listen(port, '0.0.0.0')
    .then(async () => {
      global.apiHost = await app.getUrl()
      logger.log(
        `🚀 Server is running${notInProduction ? `, swagger: ${global.apiHost}/doc` : ` on: ${global.apiHost}`}`,
      )
    })
    .catch(error => logger.error(`❌ Server starts error: ${error}`))
}

void bootstrap()
