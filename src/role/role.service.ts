import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role, RoleAttributes } from './models/role.model';

export const ROLE_NAMES = {
    ADMIN: 'admin',
    PRACTICIAN: 'practician',
    PATIENT: 'patient',
} as const;

export type ROLE_TYPE = (typeof ROLE_NAMES)[keyof typeof ROLE_NAMES];

@Injectable()
export class RoleService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: RoleAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Role.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            raw: true,
        });

        return { data, total };
    }

    async find(RoleId: string) {
        const role = await Role.findOne({
            where: {
                id: RoleId,
            },
            raw: true,
        });

        if (!role) {
            throw new NotFoundException('Role not found');
        }

        return { data: [role] };
    }

    async create(createRoleDto: CreateRoleDto) {
        const createdRole = await Role.create(
            {
                ...createRoleDto,
                // createdBy: connectedUser?.id,
            },
            { raw: true },
        );

        this.logger.info(`Created role`, { createdRole });

        return { data: [createdRole] };
    }

    async delete(RoleToDeleteId: string): Promise<void> {
        const deletedCount = await Role.destroy({
            where: { id: RoleToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Role not found');
        }

        this.logger.info(`deleted (${deletedCount}) Role(s)`, {
            RoleToDeleteId,
        });
    }
}
