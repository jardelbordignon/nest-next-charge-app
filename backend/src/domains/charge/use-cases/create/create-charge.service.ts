import { Injectable } from '@nestjs/common'
import { SocketGateway } from '@/app/socket.gateway'
import { UserRepository } from '@/domains/user/repositories/user.repository'
import { NotFoundError } from '@/infra/errors'
import { PaymentProvider } from '@/infra/providers/payment/payment'
import {
  type CreateChargeArgs,
  ChargeRepository,
} from '../../repositories/charge.repository'
import type { Charge } from '@prisma/client'

export type CreateChargeDto = Omit<
  CreateChargeArgs['data'],
  | 'id'
  | 'paymentProvider'
  | 'paymentId'
  | 'paymentStatus'
  | 'dueDate'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'payedAt'
  | 'receivedBy'
  | 'invoiceUrl'
>

@Injectable()
export class CreateChargeService {
  constructor(
    private chargeRepository: ChargeRepository,
    private userRepository: UserRepository,
    private paymentProvider: PaymentProvider,
    private socketGateway: SocketGateway,
  ) {}

  async execute(data: CreateChargeDto): Promise<Charge> {
    const { paymentMethod, amount, description, createdById, receivedById } = data

    const payerUser = await this.userRepository.findOne({
      where: { id: receivedById },
      include: { paymentProviders: true },
    })

    if (!payerUser) {
      throw new NotFoundError('Payer user not found')
    }

    // Obter o usuário pagador no provedor de pagamento
    const {
      id: payerUserId,
      address,
      addressComplement,
      addressNumber,
      document,
      email,
      fullName,
      phone,
      postalCode,
      province,
    } = payerUser

    const payerUserAccountInCurrentPaymentProvider = payerUser.paymentProviders.find(
      userPaymentProvider => userPaymentProvider.provider === 'ASAAS',
    )

    let customerIdInPaymentProvider: string

    if (payerUserAccountInCurrentPaymentProvider) {
      customerIdInPaymentProvider = payerUserAccountInCurrentPaymentProvider.accountId
    } else {
      const newCustomerInPaymentProvider = await this.paymentProvider.createCustomer({
        address,
        addressNumber,
        complement: addressComplement || undefined,
        cpfCnpj: document,
        email,
        mobilePhone: phone,
        externalReference: payerUserId,
        name: fullName,
        postalCode,
        province,
      })

      await this.userRepository.update({
        where: { id: payerUserId },
        data: {
          paymentProviders: {
            create: {
              provider: 'ASAAS',
              accountId: newCustomerInPaymentProvider.id,
            },
          },
        },
      })

      customerIdInPaymentProvider = newCustomerInPaymentProvider.id
    }

    // Criar o pagamento
    const dueDate = new Date()
    if (paymentMethod === 'BOLETO') {
      dueDate.setDate(dueDate.getDate() + 3) // 3 days from today
    }

    const payment = await this.paymentProvider.createPayment({
      customer: customerIdInPaymentProvider,
      billingType: paymentMethod,
      value: amount,
      dueDate: dueDate.toISOString().split('T')[0],
      description,
      daysAfterDueDateToRegistrationCancellation: 1,
      externalReference: payerUserId,
    })

    // Salva o pagamento no banco de dados
    const charge = await this.chargeRepository.create({
      data: {
        amount,
        description,
        dueDate,
        createdById: createdById!,
        receivedById: receivedById!,
        paymentStatus: 'PENDING',
        paymentId: payment.id,
        invoiceUrl: payment.invoiceUrl,
        paymentProvider: 'ASAAS',
        paymentMethod,
      },
    })

    this.socketGateway.sendMessageToUser(receivedById!, {
      type: 'success',
      text: `Olá ${fullName.split(' ')[0]}!\nVocê recebeu uma cobrança de ${amount} reais referente à "${description}"`,
    })

    return charge
  }
}
