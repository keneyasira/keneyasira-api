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

        const { rows: data, count: total } = await UserRole.findAndCountAll({
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
            raw: true,
        });

        return { data, total };
    }

    async find(userRoleId: string) {
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

        return userRole.get({ plain: true });
    }

    async create(createUserRoleDto: CreateUserRoleDto) {
        const createdUserRole = (await UserRole.create(createUserRoleDto)).get({ plain: true });

        if (!createdUserRole) {
            throw new Error();
        }
        this.logger.info(`UserRoleService - Created user-role`, {
            createdUserRole,
        });

        const userRole = await UserRole.findByPk(createdUserRole.id, {
            include: [{ model: User }, { model: Role }],
        });

        return userRole?.get({ plain: true });
    }

    async delete(userRoleToDeleteId: string) {
        const deletedCount = await UserRole.destroy({
            where: { id: userRoleToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('User role not found');
        }

        this.logger.info(`UserRoleService - deleted (${deletedCount}) userRole`, {
            userRoleToDeleteId,
        });
    }
}
