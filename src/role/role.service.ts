import { Injectable, NotFoundException } from '@nestjs/common';
import { KeycloakService } from 'nestjs-keycloak-admin';

import { Config } from '../../config/default';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { errorToPlainObject } from '../utils/error.helper';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { Role, RoleAttributes } from './models/role.model';
import { transformSortParamsToSequelizeFormat } from 'src/utils/sequelize.helpers';

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

    async find(RoleId: string): Promise<RoleAttributes> {
        const role = await Role.findOne({
            where: {
                id: RoleId,
            },
            raw: true,
        });

        if (!role) {
            throw new NotFoundException();
        }

        return role;
    }

    async create(
        createRoleDto: CreateRoleDto,
        connectedUserEmail: string,
    ): Promise<RoleAttributes> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const createdRole = await Role.create(
            {
                ...createRoleDto,
                createdBy: connectedUser?.id,
            },
            { raw: true },
        );

        const createdRoleValue = createdRole.toJSON();

        this.logger.info(`Created access group`, { createdRole: createdRoleValue });

        return createdRoleValue;
    }

    async update(
        updateRoleDto: UpdateRoleDto,
        connectedUserEmail: string,
    ): Promise<RoleAttributes> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const [affectedRows, [updatedRole]] = await Role.update(
            {
                ...updateRoleDto,
                updatedBy: connectedUser?.id,
            },
            {
                where: {
                    id: updateRoleDto.id,
                },
                returning: true,
            },
        );

        const updateRoleValue = updatedRole.toJSON();

        this.logger.info(`Updated (${affectedRows}) access group`, {
            updatedRole: updateRoleValue,
        });

        return updateRoleValue;
    }

    async delete(RoleToDeleteId: string, connectedUserEmail: string): Promise<number> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const deletedCount = await Role.destroy({
            where: { id: RoleToDeleteId },
        });

        await Role.update(
            {
                deletedBy: connectedUser?.id,
            },
            {
                where: { id: RoleToDeleteId },
                paranoid: false,
            },
        );

        this.logger.info(`deleted (${deletedCount}) Role(s)`, {
            imageId: RoleToDeleteId,
        });

        return deletedCount;
    }
}
