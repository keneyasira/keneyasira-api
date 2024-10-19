import { Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';

import { Config } from '../../config/default';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserAttributes } from './models/user.model';

@Injectable()
export class UserService {
    constructor(
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

    async findByUserId(userId: string): Promise<User | null> {
        const user = await User.findOne({
            where: {
                id: userId,
            },
            raw: true,
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
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

        return user.get({ plain: true });
    }

    async create(createUserDto: CreateUserDto): Promise<UserAttributes> {
        const createdUser = await User.create(
            {
                ...createUserDto,
            },
            { raw: true },
        );

        const createdUserValue = createdUser.toJSON();

        this.logger.info(`UserService - Created user`, { createdUser: createdUserValue });

        return createdUserValue;
    }

    async update(updateUserDto: UpdateUserDto): Promise<UserAttributes> {
        const userToBeUpdated = await User.findByPk(updateUserDto.id);

        if (!userToBeUpdated) {
            throw new NotFoundException('User not found');
        }

        const [affectedRows, [updatedUser]] = await User.update(
            {
                ...userToBeUpdated?.toJSON(),
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

        const updateUserValue = updatedUser.toJSON();

        this.logger.info(`UserService - Updated (${affectedRows}) user`, { updateUserValue });

        return updateUserValue;
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
