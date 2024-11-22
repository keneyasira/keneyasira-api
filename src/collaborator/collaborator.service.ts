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
import { CreateCollaboratorDto } from './dtos/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dtos/update-collaborator.dto';
import { CollaboratorDeletedEvent, CollaboratorEvents } from './events/collaborator.event';
import { Collaborator, CollaboratorAttributes } from './models/collaborator.model';

@Injectable()
export class CollaboratorService {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private eventEmitter: EventEmitter2,
    ) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: CollaboratorAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Collaborator.findAndCountAll({
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

    async find(collaboratorId: string) {
        const collaborator = await Collaborator.findOne({
            where: {
                id: collaboratorId,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!collaborator) {
            throw new NotFoundException('Collaborator not found');
        }

        return { data: collaborator.get({ plain: true }) };
    }

    async create(createCollaboratorDto: CreateCollaboratorDto & { createdBy: string }) {
        // Check if user with email or phone already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { phone: createCollaboratorDto.phone ?? '[phone-undefined]' },
                    { email: createCollaboratorDto.email ?? '[email-undefined]' },
                ],
            },
        });

        if (existingUser) {
            throw new ConflictException('User with this email or phone already exists');
        }

        // Create user first
        const user = await User.create({
            email: createCollaboratorDto.email,
            firstName: createCollaboratorDto.firstName,
            lastName: createCollaboratorDto.lastName,
            phone: createCollaboratorDto.phone,
            createdBy: createCollaboratorDto.createdBy,
        });

        // Create collaborator
        const collaborator = await Collaborator.create({
            userId: user.id,
            createdBy: createCollaboratorDto.createdBy,
        });

        // Assign collaborator role
        const collaboratorRole = await Role.findOne({
            where: {
                name: ROLE_NAMES.COLLABORATOR,
            },
        });

        if (!collaboratorRole) {
            throw new Error('Collaborator role not found');
        }

        await UserRole.create({
            userId: user.id,
            roleId: collaboratorRole.id,
            createdBy: createCollaboratorDto.createdBy,
        });

        const createdCollaborator = await Collaborator.findOne({
            where: {
                id: collaborator.id,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!createdCollaborator) {
            throw new Error('Failed to create collaborator');
        }

        const createdCollaboratorValue = createdCollaborator.get({ plain: true });

        this.logger.info(`Created collaborator`, { createdCollaborator: createdCollaboratorValue });

        return { data: createdCollaboratorValue };
    }

    async update(updateCollaboratorDto: UpdateCollaboratorDto & { updatedBy: string }) {
        const collaboratorToUpdate = await Collaborator.findByPk(updateCollaboratorDto.id, {
            include: [{ model: User }],
        });

        if (!collaboratorToUpdate) {
            throw new NotFoundException('Collaborator not found');
        }

        // Check if email/phone is already taken by another user
        if (updateCollaboratorDto.email || updateCollaboratorDto.phone) {
            const existingUser = await User.findOne({
                where: {
                    [Op.and]: [
                        {
                            id: { [Op.ne]: collaboratorToUpdate.user.id },
                        },
                        {
                            [Op.or]: [
                                { email: updateCollaboratorDto.email ?? '' },
                                { phone: updateCollaboratorDto.phone ?? '' },
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
                email: updateCollaboratorDto.email,
                firstName: updateCollaboratorDto.firstName,
                lastName: updateCollaboratorDto.lastName,
                phone: updateCollaboratorDto.phone,
                updatedBy: updateCollaboratorDto.updatedBy,
            },
            {
                where: {
                    id: collaboratorToUpdate.user.id,
                },
            },
        );

        const updatedCollaborator = await Collaborator.findOne({
            where: {
                id: updateCollaboratorDto.id,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!updatedCollaborator) {
            throw new Error('Failed to update collaborator');
        }

        const updatedCollaboratorValue = updatedCollaborator.get({ plain: true });

        this.logger.info(`Updated collaborator`, { updatedCollaborator: updatedCollaboratorValue });

        return { data: updatedCollaboratorValue };
    }

    async delete(collaboratorToDeletePayload: {
        collaboratorId: string;
        deletedBy: string;
    }): Promise<void> {
        const collaboratorToDelete = await Collaborator.findOne({
            where: { id: collaboratorToDeletePayload.collaboratorId },
            include: [{ model: User }],
        });

        if (!collaboratorToDelete) {
            throw new NotFoundException('Collaborator not found');
        }

        // Delete collaborator record
        await Collaborator.destroy({
            where: { id: collaboratorToDeletePayload.collaboratorId },
        });

        this.eventEmitter.emit(
            CollaboratorEvents.COLLABORATOR_DELETED,
            new CollaboratorDeletedEvent({
                collaboratorId: collaboratorToDeletePayload.collaboratorId,
            }),
        );

        this.logger.info(`deleted collaborator`, {
            collaboratorToDeleteId: collaboratorToDeletePayload.collaboratorId,
        });
    }
}
