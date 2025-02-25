import { Module } from '@nestjs/common'
import { AppSocketGateway } from './app/app.socket.gateway'
import { DomainsModule } from './domains/domains.module'
import { InfraModule } from './infra/infra.module'

@Module({
  imports: [InfraModule, DomainsModule],
  controllers: [],
  providers: [AppSocketGateway],
})
export class AppModule {}
