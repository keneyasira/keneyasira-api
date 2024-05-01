import { Injectable, NotFoundException } from '@nestjs/common';
import { KeycloakService } from 'nestjs-keycloak-admin';

import { Config } from '../../config/default';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { User } from '../user/models/user.model';
import { errorToPlainObject } from '../utils/error.helper';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { DeleteUserRoleDto } from './dtos/delete-user-role.dto';

@Injectable()
export class UserRoleService {
    constructor(
        private readonly keycloakService: KeycloakService,
        private readonly config: Config,
        private readonly logger: ApplicationLoggerService,
    ) {}

    async find(userId: string) {
        try {
            //TODO
        } catch (error) {
            this.logger.error(
                `UserRoleService - failed to get user-role, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    async create(createUserRoleDto: CreateUserRoleDto, connectedUserEmail: string) {
        try {
            const connectedUser = await User.findOne({
                where: {
                    email: connectedUserEmail,
                },
                raw: true,
            });

            if (!connectedUser) {
                throw new NotFoundException(`Connected user not found`);
            }

            //TODO

            this.logger.info(`UserRoleService - Created user role`);
        } catch (error) {
            this.logger.error(
                `UserRoleService - failed to create user-role, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }

    async delete(deleteUserRoleDto: DeleteUserRoleDto, connectedUserEmail: string) {
        try {
            const connectedUser = await User.findOne({
                where: {
                    email: connectedUserEmail,
                },
                raw: true,
            });

            if (!connectedUser) {
                throw new NotFoundException(`Connected user not found`);
            }

            //TODO

        } catch (error) {
            this.logger.error(
                `UserRoleService - failed to delete user-role, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }
}
