import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = app.get(EnvService).get('PORT')
  const logger = new Logger('Bootstrap')

  await app
    .listen(port)
    .then(async () => {
      global.apiHost = await app.getUrl()
      logger.log(`🚀 Server is running on: ${global.apiHost}`)
    })
    .catch(error => logger.error(`❌ Server starts error: ${error}`))
}

void bootstrap()
