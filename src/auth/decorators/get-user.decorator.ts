import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator(
  (data: string, executionContext: ExecutionContext) => {
    const req = executionContext.switchToHttp().getRequest()
    return data ? req.user?.[data] : req.user
  },
)
