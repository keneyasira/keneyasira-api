import { SetMetadata } from '@nestjs/common';

import type { ROLE_TYPE } from '../role.service';

export const ROLES = 'roles';
export const Roles = (...roles: ROLE_TYPE[]) => SetMetadata(ROLES, roles);
