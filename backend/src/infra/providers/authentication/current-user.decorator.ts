import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import type { JwtPayload } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<{ user: JwtPayload }>()
    return data ? user?.[data] : user
  },
)
