import { CreateUserArgs } from '@/domains/user/repositories/user.repository'

export const CREATE_USER_DATA: CreateUserArgs['data'] = {
  email: 'johndoe@email.com',
  fullName: 'John Doe',
  password: 'Pwd@123',
}

export const getUserAuthorization = async () => {
  await global.api.post('/users').send(CREATE_USER_DATA)
  const { body } = await global.api.post('/auth/credentials').send(CREATE_USER_DATA)
  return `Bearer ${body.token}`
}
