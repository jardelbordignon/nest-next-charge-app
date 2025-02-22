import { sleep } from '@/infra/utils/helper-functions'
import { Encrypter } from './encrypter'

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    await sleep()
    return JSON.stringify(payload)
  }
}
