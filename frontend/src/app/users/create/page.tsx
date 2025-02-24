'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { TextInput, Button } from '@/components'
import { type CreateUserFormData, createUserFormSchema, useUsers } from '@/hooks/useUsers'

export default function CreateUserPage() {

  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })
  const { errors, isSubmitting } = formState
  const field = (name: keyof CreateUserFormData) => ({
      ...register(name),
      error: errors[name]
    })
  const { createUser } = useUsers()

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      await createUser(data)
      redirect('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        toast.error('Um erro inesperado ocorreu ')
        console.error('Submit error:', error)
      }
    }
  }

  return (
    <main className='flex flex-col h-screen justify-center max-w-[572px] mx-auto'>
      <header className='px-6'>
        <h1 className='font-bold text-2xl leading-[160%]'>
          Cadastro
        </h1>
      </header>

      <section className='bg-slate-900 p-6 rounded'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>          
          <TextInput placeholder='Nome completo' {...field('fullName')} />
          <TextInput placeholder='Celular' {...field('phone')} />
          <TextInput placeholder='E-mail' {...field('email')} />
          <TextInput placeholder='Senha' {...field('password')} secret />
          <TextInput placeholder='CPF' {...field('document')} />
          <TextInput placeholder='Endereço' {...field('address')} />
          <TextInput placeholder='Número' {...field('addressNumber')} />
          <TextInput placeholder='Complemento' {...field('addressComplement')} />
          <TextInput placeholder='CEP' {...field('postalCode')} />
          <TextInput placeholder='UF' {...field('province')} />
     
          <Button type='submit' submitting={isSubmitting}>Cadastrar</Button>
          <Button type='button' variant='outline' onClick={() => redirect('/users/login')}>Já tenho uma conta</Button>
        </form>
      </section>
    </main>
  )
}
