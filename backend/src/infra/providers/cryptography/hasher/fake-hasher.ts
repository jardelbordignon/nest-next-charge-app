import { sleep } from '@/infra/utils/helper-functions'
import { Hasher } from './hasher'

export class FakeHasher implements Hasher {
  async hash(plain: string) {
    await sleep()
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string) {
    await sleep()
    return plain.concat('-hashed') === hash
  }
}
