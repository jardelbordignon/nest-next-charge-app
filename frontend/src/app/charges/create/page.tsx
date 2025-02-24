'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import cookies from 'js-cookie'
import { Button, SelectInput, TextInput } from '@/components'
import { type CreateChargeFormSchema, createChargeFormSchema, useCharges } from '@/hooks/use-charges'
import { type User, useUsers } from '@/hooks/use-users'

export default function AuthenticateUserPage() {
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<CreateChargeFormSchema>({
    resolver: zodResolver(createChargeFormSchema),
  })
  const { errors, isSubmitting } = formState
  const field = (name: keyof CreateChargeFormSchema) => ({
      ...register(name),
      error: errors[name]
    })

  const { createCharge } = useCharges()
  const { getUsers } = useUsers()

  const onSubmit = async (data: CreateChargeFormSchema) => {
    try {
      const response = await createCharge(data)
      toast.success(`Cobrança "${response.description}" gerada com sucesso!`)
      //router.push('/charges')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        console.log('Submit error:', error)
        toast.error('Um erro inesperado ocorreu ')
      }
    }
  }

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  const accessToken = cookies.get('access_token')
  const payload = JSON.parse(atob(accessToken!.split('.')[1]))
  const currentUserId = payload.sub || null

  const selectUsersOptions = users
    .filter(user => user.id !== currentUserId)
    .map((user) => ({
      label: user.fullName,
      value: user.id,
    }))

  return (
    <main className='flex flex-col h-screen justify-center max-w-[572px] mx-auto'>
      <header className='px-6'>
        <h1 className='font-bold text-2xl leading-[160%]'>
          Gerar cobrança
        </h1>
      </header>

      <section className='bg-slate-900 p-6 rounded'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>          
          <TextInput placeholder='Valor' {...field('amount')} type="number" />
          <TextInput placeholder='Descrição' {...field('description')} />
          <SelectInput options={
            [
              { label: 'Cartão de crédito', value: 'CREDIT_CARD' },
              { label: 'Boleto', value: 'BOLETO' },
              { label: 'Pix', value: 'PIX' },
            ]
            } {...field('paymentMethod')} 
          />
          <SelectInput options={selectUsersOptions} {...field('receivedById')} />
     
          <Button type='submit' disabled={isSubmitting}>Gerar cobrança</Button>
          <Button type='button' variant='outline' onClick={() => router.push('/charges')}>Minhas cobranças</Button>
        </form>
      </section>
    </main>
  )
}
