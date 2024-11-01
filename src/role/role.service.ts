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
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(RoleId: string) {
        const role = await Role.findOne({
            where: {
                id: RoleId,
            },
        });

        if (!role) {
            throw new NotFoundException('Role not found');
        }

        return { data: role.get({ plain: true }) };
    }

    async create(createRolePayload: CreateRoleDto & { createdBy: string }) {
        const createdRole = await Role.create({
            ...createRolePayload,
        });

        this.logger.info(`Created role`, { createdRole });

        return { data: createdRole.get({ plain: true }) };
    }

    async delete(roleToDeletePayload: { roleId: string; deletedBy: string }): Promise<void> {
        const deletedCount = await Role.destroy({
            where: { id: roleToDeletePayload.roleId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Role not found');
        }

        // TODO // emit patient delete event
        // this.eventEmitter.emit(
        //     'role.deleted',
        //     new RoleDeletedEvent({
        //         roleId: roleToDeletePayload.roleId,
        //         actionUserId: roleToDeletePayload.deletedBy,
        //     }),
        // );

        this.logger.info(`deleted (${deletedCount}) Role(s)`, {
            RoleToDeleteId: roleToDeletePayload,
        });
    }
}
