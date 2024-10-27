import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { UserAttributes } from '../../user/models/user.model';

export const AuthenticatedUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserAttributes => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const request = ctx.switchToHttp().getRequest();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return request.user as UserAttributes;
    },
);
