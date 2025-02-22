import { Module } from '@nestjs/common'
import { BcryptHasher } from './hasher/bcrypt-hasher'
import { Hasher } from './hasher/hasher'

@Module({
  exports: [Hasher],
  providers: [{ provide: Hasher, useClass: BcryptHasher }],
})
export class CryptographyModule {}
