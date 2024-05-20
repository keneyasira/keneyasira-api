import { Injectable, NotFoundException } from '@nestjs/common';

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
    ): Promise<UserAttributes> {

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

    async update(updateUserDto: UpdateUserDto) {

        const userToBeUpdated =  await User.findByPk(updateUserDto.id);

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

        const updateUserValue = updatedUser.toJSON();

        this.logger.info(`UserService - Updated (${affectedRows}) user`, { updateUserValue });

        return updateUserValue;
    }

    async delete(userToDeleteId: string) {

        const deletedCount = await User.destroy({
            where: { id: userToDeleteId },
        });

        this.logger.info(`UserService - deleted (${deletedCount}) user`, {
            userId: userToDeleteId,
        });

        return deletedCount;
    }

}
