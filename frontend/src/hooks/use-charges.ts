import api from '@/lib/api'
import { z } from 'zod'

export const createChargeFormSchema = z.object({
  paymentMethod: z.enum(['CREDIT_CARD', 'BOLETO', 'PIX']),
  amount: z
    .string()
    .min(1)
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'O valor deve ser um número positivo',
    }),
  description: z.string().min(1),
  receivedById: z.string().uuid(),
})

export type CreateChargeFormSchema = z.infer<typeof createChargeFormSchema>

export type Charge = {
  id: string
  paymentProvider: string
  paymentId: string
  paymentMethod: string
  paymentStatus: string
  invoiceUrl: string
  amount: number,
  description: string
  dueDate: string
  payedAt: string | null,
  createdAt: string
  updatedAt: string
  createdById: string
  receivedById: string
}

export type GetChargesResponse = {
  chargesReceivable: Charge[]
  chargesPayable: Charge[]
}

export const useCharges = () => {
  const getCharges = async () => {
    const response = await api.get<GetChargesResponse>('/charges');
    return response.data;
  };

  const createCharge = async (chargeData: CreateChargeFormSchema) => {
    const response = await api.post<Charge>('/charges', chargeData);
    return response.data;
  };

  return { getCharges, createCharge }
}