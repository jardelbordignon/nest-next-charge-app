import { CreateUserArgs } from '@/domains/user/repositories/user.repository'

export const CREATE_USER_DATA: CreateUserArgs['data'] = {
  email: 'johndoe@email.com',
  fullName: 'John Doe',
  password: 'Pwd@123',
  address: 'Rua Parecis',
  addressNumber: '170',
  addressComplement: 'Esquina com Tupiniquins',
  document: '24971563792',
  phone: '54991307936',
  postalCode: '99500-000',
  province: 'Rio Grande do Sul',
}

export const getUserAuthorization = async () => {
  await global.api.post('/users').send(CREATE_USER_DATA)
  const { body } = await global.api.post('/users/authenticate').send(CREATE_USER_DATA)
  return `Bearer ${body.accessToken}`
}
