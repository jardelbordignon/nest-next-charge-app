import { CREATE_USER_DATA } from 'test/utils'
import { InMemoryUserRepository } from '@/domains/user/repositories/in-memory.user.repository'
import { InMemoryPaymentProvider } from '@/infra/providers/payment/in-memory-payment'
import { PaymentProvider } from '@/infra/providers/payment/payment'
import { InMemoryChargeRepository } from '../../repositories/in-memory.charge.repository'
import { CreateChargeService } from './create-charge.service'
import type { User } from '@prisma/client'

describe('Create charge', () => {
  let chargeRepository: InMemoryChargeRepository
  let userRepository: InMemoryUserRepository
  let createChargeService: CreateChargeService
  let paymentProvider: PaymentProvider
  let john: User
  let jack: User

  beforeAll(async () => {
    chargeRepository = new InMemoryChargeRepository()
    userRepository = new InMemoryUserRepository()
    paymentProvider = new InMemoryPaymentProvider()
    createChargeService = new CreateChargeService(
      chargeRepository,
      userRepository,
      paymentProvider,
    )

    john = await userRepository.create({ data: CREATE_USER_DATA })
    jack = await userRepository.create({
      data: { ...CREATE_USER_DATA, fullName: 'Jack Doe', email: 'jackdoe@email.com' },
    })
  })

  it('should be able to create a new charge', async () => {
    const createdCharge = await createChargeService.execute({
      amount: 100,
      description: 'Test charge',
      paymentMethod: 'BOLETO',
      createdById: john.id,
      receivedById: jack.id,
    })

    expect(createdCharge).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        amount: 100,
        description: 'Test charge',
        paymentMethod: 'BOLETO',
        createdById: john.id,
        receivedById: jack.id,
        paymentProvider: 'ASAAS',
        paymentId: expect.any(String),
        paymentStatus: 'PENDING',
        dueDate: expect.any(Date),
      }),
    )
  })
})
