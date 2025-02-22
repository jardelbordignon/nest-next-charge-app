import { Module } from '@nestjs/common'
import { Encrypter } from './encrypter/encrypter'
import { JwtEncrypter } from './encrypter/jwt-encrypter'
import { BcryptHasher } from './hasher/bcrypt-hasher'
import { Hasher } from './hasher/hasher'

@Module({
  exports: [Hasher, Encrypter],
  providers: [
    { provide: Hasher, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
})
export class CryptographyModule {}
