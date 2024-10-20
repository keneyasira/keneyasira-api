import { SetMetadata } from '@nestjs/common';

export type ROLE_TYPE = 'admin' | 'patient' | 'practician';
export const ROLES = 'roles';
export const Roles = (...roles: ROLE_TYPE[]) => SetMetadata(ROLES, roles);
