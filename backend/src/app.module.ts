import { Module } from '@nestjs/common'
import { DomainsModule } from './domains/domains.module'
import { InfraModule } from './infra/infra.module'

@Module({
  imports: [InfraModule, DomainsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
