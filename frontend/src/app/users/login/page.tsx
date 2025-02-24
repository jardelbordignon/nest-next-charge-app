'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import { TextInput, Button } from '@/components'
import { type AuthenticateUserFormSchema, authenticateUserFormSchema, useUsers } from '@/hooks/use-users'

export default function AuthenticateUserPage() {

  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<AuthenticateUserFormSchema>({
    resolver: zodResolver(authenticateUserFormSchema),
  })
  const { errors, isSubmitting } = formState
  const field = (name: keyof AuthenticateUserFormSchema) => ({
      ...register(name),
      error: errors[name]
    })
  const { authenticateUser } = useUsers()

  const onSubmit = async (data: AuthenticateUserFormSchema) => {
    try {
      await authenticateUser(data)
      router.push('/charges')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        console.log('Submit error:', error)
        toast.error('Um erro inesperado ocorreu ')
      }
    }
  }

  return (
    <main className='flex flex-col h-screen justify-center max-w-[572px] mx-auto'>
      <header className='px-6'>
        <h1 className='font-bold text-2xl leading-[160%]'>
          Login
        </h1>
      </header>

      <section className='bg-slate-900 p-6 rounded'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>          
          <TextInput placeholder='E-mail' {...field('email')} />
          <TextInput placeholder='Senha' {...field('password')} secret />
     
          <Button type='submit' disabled={isSubmitting}>Entrar</Button>
          <Button type='button' variant='outline' onClick={() => router.push('/')}>Não tenho conta</Button>
        </form>
      </section>
    </main>
  )
}
