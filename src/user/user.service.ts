import { Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';

import { Config } from '../../config/default';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, type UserAttributes } from './models/user.model';
import { Role } from '../role/models/role.model';

@Injectable()
export class UserService {
    constructor(
        private readonly config: Config,
        private readonly logger: ApplicationLoggerService,
    ) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: UserAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await User.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async findByUserId(userId: string) {
        const user = await User.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return { data: user.get({ plain: true }) };
    }

    async findByEmailOrNumber({ email, phone }: { email: string; phone: string }) {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ phone: phone ?? '' }, { email: email ?? '' }],
            },
        });

        if (!user) {
            return;
        }

        return { data: user.get({ plain: true }) };
    }

    async create(createUserDto: CreateUserDto) {
        const [createdUser, _] = await User.findOrCreate({
            where: {
                [Op.or]: [
                    { phone: createUserDto.phone ?? '' },
                    { email: createUserDto.email ?? '' },
                ],
            },
            defaults: createUserDto,
        });

        const createdUserValue = createdUser.get({ plain: true });

        this.logger.info(`UserService - Created user`, { createdUser: createdUserValue });

        return { data: createdUserValue };
    }

    async update(updateUserDto: UpdateUserDto) {
        const userToBeUpdated = await User.findByPk(updateUserDto.id);

        if (!userToBeUpdated) {
            throw new NotFoundException('User not found');
        }

        const [affectedRows, [updatedUser]] = await User.update(
            {
                ...userToBeUpdated?.get({ plain: true }),
                ...updateUserDto,
            },
            {
                where: {
                    id: updateUserDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('User not found');
        }

        const updateUserValue = updatedUser.get({ plain: true });

        this.logger.info(`UserService - Updated (${affectedRows}) user`, { updateUserValue });

        return { data: updateUserValue };
    }

    async delete(userToDeleteId: string): Promise<void> {
        const deletedCount = await User.destroy({
            where: { id: userToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('User not found');
        }

        this.logger.info(`UserService - deleted (${deletedCount}) user`, {
            userId: userToDeleteId,
        });
    }
}
