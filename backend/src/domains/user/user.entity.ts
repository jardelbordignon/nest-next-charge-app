import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements Omit<User, 'password'> {
  @ApiProperty()
  id!: string

  @ApiProperty()
  fullName!: string

  @ApiProperty()
  email!: string

  @ApiProperty()
  document!: string

  @ApiProperty()
  phone!: string

  @ApiProperty()
  address!: string

  @ApiProperty()
  addressNumber!: string

  @ApiProperty()
  addressComplement!: string | null

  @ApiProperty()
  province!: string

  @ApiProperty()
  postalCode!: string

  @ApiProperty()
  createdAt!: Date

  @ApiProperty()
  updatedAt!: Date | null
}
