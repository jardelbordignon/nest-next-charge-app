import { HttpException, HttpStatus } from '@nestjs/common'
import axios, { AxiosError } from 'axios'
import { PaymentProvider } from './payment'
import type {
  CreateCustomerData,
  CreateCustomerResponse,
  CreatePaymentData,
} from './types'
import 'dotenv/config'

export class AsaasPaymentProvider implements PaymentProvider {
  private readonly apiUrl = process.env.ASAAS_API_URL
  private readonly accessToken = process.env.ASAAS_API_KEY

  async createCustomer(data: CreateCustomerData): Promise<CreateCustomerResponse> {
    try {
      const response = await axios.post<CreateCustomerResponse>(
        `${this.apiUrl}/customers`,
        data,
        {
          headers: {
            access_token: this.accessToken,
          },
        },
      )

      return response.data
    } catch (error) {
      let errorMsg = 'Erro ao criar cliente no Asaas: '
      if (error instanceof AxiosError) {
        errorMsg += error.response?.data ?? error.message
      } else if (error instanceof Error) {
        errorMsg += error.message
      } else {
        console.error(error)
      }
      console.error(errorMsg)
      throw new HttpException(errorMsg, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createPayment(data: CreatePaymentData): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/payments`, data, {
        headers: {
          access_token: this.accessToken,
        },
      })

      return response.data
    } catch (error) {
      let errorMsg = 'Erro ao criar pagamento no Asaas: '
      if (error instanceof AxiosError) {
        errorMsg += error.response?.data ?? error.message
      } else if (error instanceof Error) {
        errorMsg += error.message
      } else {
        console.error(error)
      }
      console.error(errorMsg)
      throw new HttpException(errorMsg, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
