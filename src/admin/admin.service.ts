import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Op } from 'sequelize';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Role } from '../role/models/role.model';
import { ROLE_NAMES } from '../role/role.service';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { UserRole } from '../user-role/models/user-role.model';
import {
    buildUserSearchQuery,
    transformSortParamsToSequelizeFormat,
} from '../utils/sequelize.helpers';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { AdminDeletedEvent, AdminEvents } from './events/admin.event';
import { Admin, AdminAttributes } from './models/admin.model';

@Injectable()
export class AdminService {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private eventEmitter: EventEmitter2,
    ) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: AdminAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Admin.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: User,
                    where: buildUserSearchQuery(options.search),
                },
            ],
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(adminId: string) {
        const admin = await Admin.findOne({
            where: {
                id: adminId,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!admin) {
            throw new NotFoundException('Admin not found');
        }

        return { data: admin.get({ plain: true }) };
    }

    async create(createAdminDto: CreateAdminDto & { createdBy: string }) {
        // Check if user with email or phone already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { phone: createAdminDto.phone ?? '[phone-undefined]' },
                    { email: createAdminDto.email ?? '[email-undefined]' },
                ],
            },
        });

        if (existingUser) {
            throw new ConflictException('User with this email or phone already exists');
        }

        // Create user first
        const user = await User.create({
            email: createAdminDto.email,
            firstName: createAdminDto.firstName,
            lastName: createAdminDto.lastName,
            phone: createAdminDto.phone,
            createdBy: createAdminDto.createdBy,
        });

        // Create admin
        const admin = await Admin.create({
            userId: user.id,
            createdBy: createAdminDto.createdBy,
        });

        // Assign admin role
        const adminRole = await Role.findOne({
            where: {
                name: ROLE_NAMES.ADMIN,
            },
        });

        if (!adminRole) {
            throw new Error('Admin role not found');
        }

        await UserRole.create({
            userId: user.id,
            roleId: adminRole.id,
            createdBy: createAdminDto.createdBy,
        });

        const createdAdmin = await Admin.findOne({
            where: {
                id: admin.id,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!createdAdmin) {
            throw new Error('Failed to create admin');
        }

        const createdAdminValue = createdAdmin.get({ plain: true });

        this.logger.info(`Created admin`, { createdAdmin: createdAdminValue });

        return { data: createdAdminValue };
    }

    async update(updateAdminDto: UpdateAdminDto & { updatedBy: string }) {
        const adminToUpdate = await Admin.findByPk(updateAdminDto.id, {
            include: [{ model: User }],
        });

        if (!adminToUpdate) {
            throw new NotFoundException('Admin not found');
        }

        // Check if email/phone is already taken by another user
        if (updateAdminDto.email || updateAdminDto.phone) {
            const existingUser = await User.findOne({
                where: {
                    [Op.and]: [
                        {
                            id: { [Op.ne]: adminToUpdate.user.id },
                        },
                        {
                            [Op.or]: [
                                { email: updateAdminDto.email ?? '' },
                                { phone: updateAdminDto.phone ?? '' },
                            ],
                        },
                    ],
                },
            });

            if (existingUser) {
                throw new ConflictException('User with this email or phone already exists');
            }
        }

        // Update user details
        await User.update(
            {
                email: updateAdminDto.email,
                firstName: updateAdminDto.firstName,
                lastName: updateAdminDto.lastName,
                phone: updateAdminDto.phone,
                updatedBy: updateAdminDto.updatedBy,
            },
            {
                where: {
                    id: adminToUpdate.user.id,
                },
            },
        );

        const updatedAdmin = await Admin.findOne({
            where: {
                id: updateAdminDto.id,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!updatedAdmin) {
            throw new Error('Failed to update admin');
        }

        const updatedAdminValue = updatedAdmin.get({ plain: true });

        this.logger.info(`Updated admin`, { updatedAdmin: updatedAdminValue });

        return { data: updatedAdminValue };
    }

    async delete(adminToDeletePayload: { adminId: string; deletedBy: string }): Promise<void> {
        const adminToDelete = await Admin.findOne({
            where: { id: adminToDeletePayload.adminId },
            include: [{ model: User }],
        });

        if (!adminToDelete) {
            throw new NotFoundException('Admin not found');
        }

        // Delete admin record
        await Admin.destroy({
            where: { id: adminToDeletePayload.adminId },
        });

        this.eventEmitter.emit(
            AdminEvents.ADMIN_DELETED,
            new AdminDeletedEvent({ adminId: adminToDeletePayload.adminId }),
        );

        this.logger.info(`deleted admin`, {
            adminToDeleteId: adminToDeletePayload.adminId,
        });
    }
}
