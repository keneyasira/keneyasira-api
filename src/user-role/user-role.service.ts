import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { User } from '../user/models/user.model';
import { errorToPlainObject } from '../utils/error.helper';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { UserRole, UserRoleAttributes } from './models/user-role.model';
import { Role } from '../role/models/role.model';

@Injectable()
export class UserRoleService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: UserRoleAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows, count: total } = await UserRole.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: User,
                },
                {
                    model: Role,
                },
            ],
        });

        const data = rows.map((row) => row.toJSON());

        return { data, total };
    }

    async find(userRoleId: string) {
        try {
            const userRole = await UserRole.findOne({
                where: {
                    id: userRoleId,
                },
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Role,
                    },
                ],
            });

            if (!userRole) {
                throw new NotFoundException();
            }

            return userRole.toJSON();
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

    async create(createUserRoleDto: CreateUserRoleDto) {
        try {
            const createdUserRole = await UserRole.create({
                ...createUserRoleDto,
            });

            const createdUserRoleValue = createdUserRole.toJSON();

            this.logger.info(`UserRoleService - Created user-role`, {
                createdUserRole: createdUserRoleValue,
            });

            const userRole = await UserRole.findByPk(createdUserRoleValue.id, {
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Role,
                    },
                ],
            });

            return userRole?.toJSON();
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

    async delete(userRoleToDeleteId: string) {
        try {
            const deletedCount = await UserRole.destroy({
                where: { id: userRoleToDeleteId },
            });

            this.logger.info(`UserRoleService - deleted (${deletedCount}) userRole`, {
                userRoleToDeleteId,
            });

            return deletedCount;
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
