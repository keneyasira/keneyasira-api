import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Image } from '../image/models/image.model';
import { Tag } from '../tag/models/tag.model';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateCategoryDto } from './dtos/create-patient.dto';
import { UpdateCategoryDto, UpdateCategoryPayload } from './dtos/update-patient.dto';
import { Category, CategoryAttributes } from './models/category.model';

@Injectable()
export class CategoryService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: CategoryAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows, count: total } = await Category.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: Image,
                    attributes: ['id', 'url'],
                },
                {
                    model: Tag,
                    attributes: ['id', 'title'],
                },
            ],
        });

        const data = rows.map((row) => row.toJSON());

        return { data, total };
    }

    async find(categoryId: string): Promise<CategoryAttributes> {
        const highlight = await Category.findOne({
            where: {
                id: categoryId,
            },
            include: [
                {
                    model: Image,
                    attributes: ['id', 'url'],
                },
                {
                    model: Tag,
                    attributes: ['id', 'title'],
                },
            ],
        });

        if (!highlight) {
            throw new NotFoundException();
        }

        return highlight.toJSON();
    }

    async create(
        createCategoryDto: CreateCategoryDto,
        connectedUserEmail: string,
    ): Promise<CategoryAttributes> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const tag = await Tag.findByPk(createCategoryDto.tagId);

        if (tag?.path) {
            throw new Error(
                'CategoryService - A category should only be associated to first level tags without ascendants !',
            );
        }
        const createdCategory = await Category.create({
            ...createCategoryDto,
            path: null,
            createdBy: connectedUser?.id,
        });

        const createdCategoryValue = createdCategory.toJSON();

        this.logger.info(`CategoryService - Created Category`, {
            createdCategory: createdCategoryValue,
        });

        return createdCategoryValue;
    }

    async update(
        updateCategoryDto: UpdateCategoryDto,
        connectedUserEmail: string,
    ): Promise<CategoryAttributes> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const updateValues: UpdateCategoryPayload = {
            ...updateCategoryDto,
        };

        if (updateCategoryDto?.tagId) {
            const tag = await Tag.findByPk(updateCategoryDto.tagId);

            if (tag?.path) {
                throw new Error(
                    'CategoryService - A category should only be associated to first level tags without ascendants !',
                );
            }
        }

        const [affectedRows, [updatedCategory]] = await Category.update(
            {
                ...updateValues,
                updatedBy: connectedUser?.id,
            },
            {
                where: {
                    id: updateCategoryDto.id,
                },
                returning: true,
            },
        );

        const updateCategoryValue = updatedCategory.toJSON();

        this.logger.info(`CategoryService - Updated (${affectedRows}) Category`, {
            updatedCategory: updateCategoryValue,
        });

        return updateCategoryValue;
    }

    async delete(categoryToDeleteId: string, connectedUserEmail: string): Promise<number> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const deletedCount = await Category.destroy({
            where: { id: categoryToDeleteId },
        });

        await Category.update(
            {
                deletedBy: connectedUser?.id,
            },
            {
                where: { id: categoryToDeleteId },
                paranoid: false,
            },
        );

        this.logger.info(`CategoryService - deleted (${deletedCount}) category`, {
            categoryId: categoryToDeleteId,
        });

        return deletedCount;
    }
}
