import api from '@/lib/api'
import { z } from 'zod'

export const createUserFormSchema = z.object({
  email: z.string().email().min(1),
  fullName: z.string().min(1),
  password: z.string().min(1),
  address: z.string().min(1),
  addressNumber: z.string().min(1),
  addressComplement: z.string().nullable(),
  document: z.string().min(1),
  phone: z.string().min(1),
  postalCode: z.string().min(1),
  province: z.string(),
})

export type CreateUserFormData = z.infer<typeof createUserFormSchema>

export type User = CreateUserFormData & {
  id: string
  createdAt: Date
  updatedAt: Date | null
}

export const useUsers = () => {
  const getUsers = async () => {
    const response = await api.get<User[]>('/users')
    return response.data
  }

  const createUser = async (userData: CreateUserFormData) => {
    const response = await api.post('/users', userData)
    return response.data
  }

  const deleteUser = async (userId: string) => {
    const response = await api.delete<void>(`/users/${userId}`)
    return response.data
  }

  return { getUsers, createUser, deleteUser }
}