import { Test, TestingModule } from '@nestjs/testing'
import { AppSocketGateway } from './app.socket.gateway'

describe('AppSocketGateway', () => {
  let gateway: AppSocketGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppSocketGateway],
    }).compile()

    gateway = module.get<AppSocketGateway>(AppSocketGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
