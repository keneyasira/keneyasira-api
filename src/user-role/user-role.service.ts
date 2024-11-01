import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Role } from '../role/models/role.model';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { UserRole, UserRoleAttributes } from './models/user-role.model';

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
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
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

        return { data: userRole.get({ plain: true }) };
    }

    async getUserRoles(userId: string) {
        const results = await UserRole.findAll({
            where: {
                userId,
            },
            include: [
                {
                    model: Role,
                },
            ],
        });

        return results.map((value) => value.get({ plain: true })?.role?.name);
    }

    async create(createUserRoleDto: CreateUserRoleDto) {
        const createdUserRole = await UserRole.create({ ...createUserRoleDto }, { raw: true });

        if (!createdUserRole) {
            throw new Error();
        }
        this.logger.info(`UserRoleService - Created user-role`, {
            createdUserRole,
        });

        return await this.find(createdUserRole.id);
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
