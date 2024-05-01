import { Injectable, NotFoundException } from '@nestjs/common';
import { KeycloakService } from 'nestjs-keycloak-admin';

import { Config } from '../../config/default';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { KeycloakUser } from '../typings/keycloak.typings';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserAttributes } from './models/user.model';

interface CreateOrUpdateUserData {
    user: KeycloakUser;
    connectedUserId: string;
}

interface DeleteUserData {
    // users/d57594cd-7425-492f-a3a7-4576d51ea745
    userPath: string;
    connectedUserId: string;
}

@Injectable()
export class UserService {
    constructor(
        private readonly keycloakService: KeycloakService,
        private readonly config: Config,
        private readonly logger: ApplicationLoggerService,
    ) {}

    async findAndCountAll(options: QueryParams): Promise<{ data: User[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await User.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            raw: true,
        });

        return { data, total };
    }

    async find(userId: string): Promise<User | null> {
        const user = await User.findOne({
            where: {
                id: userId,
            },
            raw: true,
        });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async create(
        createUserDto: CreateUserDto,
        // connectedUserEmail: string,
    ): Promise<UserAttributes> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const createdUser = await User.create(
            {
                ...createUserDto,
                createdBy: connectedUser?.id,
            },
            { raw: true },
        );

        const createdUserValue = createdUser.toJSON();

        this.logger.info(`UserService - Created user`, { createdUser: createdUserValue });

        return createdUserValue;
    }

    async update(updateUserDto: UpdateUserDto, connectedUserEmail: string) {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const [affectedRows, [updatedUser]] = await User.update(
            {
                ...updateUserDto,
                updatedBy: connectedUser?.id,
            },
            {
                where: {
                    id: updateUserDto.id,
                },
                returning: true,
            },
        );

        const updateUserValue = updatedUser.toJSON();

        this.logger.info(`UserService - Updated (${affectedRows}) user`, { updateUserValue });

        return updateUserValue;
    }

    async delete(userToDeleteId: string, connectedUserEmail: string) {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const deletedCount = await User.destroy({
            where: { id: userToDeleteId },
        });

        await User.update(
            {
                deletedBy: connectedUser?.id,
            },
            {
                where: { id: userToDeleteId },
                paranoid: false,
            },
        );

        this.logger.info(`UserService - deleted (${deletedCount}) user`, {
            userId: userToDeleteId,
        });

        return deletedCount;
    }

}
