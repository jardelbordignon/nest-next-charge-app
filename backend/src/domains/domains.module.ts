import { Module } from '@nestjs/common'
import { ChargeModule } from './charge/charge.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [ChargeModule, UserModule],
})
export class DomainsModule {}
