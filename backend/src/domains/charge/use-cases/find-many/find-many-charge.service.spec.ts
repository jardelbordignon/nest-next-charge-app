import { CreateChargeArgs } from '../../repositories/charge.repository'
import { InMemoryChargeRepository } from '../../repositories/in-memory.charge.repository'
import { FindManyChargeService } from './find-many-charge.service'

describe('Find many charge', () => {
  let chargeRepository: InMemoryChargeRepository
  let findManyChargeService: FindManyChargeService

  const CREATE_PAYMENT_DATA: CreateChargeArgs['data'] = {
    amount: 100,
    description: 'Test charge',
    dueDate: new Date().toISOString().split('T')[0],
    createdById: 'user-A',
    receivedById: 'user-B',
    paymentStatus: 'PENDING',
    paymentId: 'payment-1',
    paymentProvider: 'ASAAS',
    paymentMethod: 'BOLETO',
  }

  beforeAll(async () => {
    chargeRepository = new InMemoryChargeRepository()
    findManyChargeService = new FindManyChargeService(chargeRepository)

    chargeRepository.reset()
    await chargeRepository.create({ data: CREATE_PAYMENT_DATA })
    await chargeRepository.create({
      data: { ...CREATE_PAYMENT_DATA, receivedById: 'user-C' },
    })
    await chargeRepository.create({
      data: { ...CREATE_PAYMENT_DATA, receivedById: 'user-D' },
    })
    await chargeRepository.create({
      data: { ...CREATE_PAYMENT_DATA, createdById: 'user-C', receivedById: 'user-A' },
    })
  })

  it('should be able to find many charges', async () => {
    const chargesReceivableByUserA = await findManyChargeService.execute({
      where: { createdById: 'user-A' },
    })

    expect(chargesReceivableByUserA.length).toBe(3)

    const chargesPayableByUserA = await findManyChargeService.execute({
      where: { receivedById: 'user-A' },
    })

    expect(chargesPayableByUserA.length).toBe(1)
  })
})
