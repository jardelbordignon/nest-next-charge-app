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
  createdAt!: Date

  @ApiProperty()
  updatedAt!: Date | null
}
