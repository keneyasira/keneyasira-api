import { Optional } from 'sequelize/dist';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { Image } from '../../image/models/image.model';
import { Tag } from '../../tag/models/tag.model';

export interface CategoryAttributes extends BaseAttributes {
    title: string;
    imageId: string;
    tagId: string;
    path: string | null;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

@Table({
    tableName: 'category',
})
export class Category extends BaseModel<CategoryAttributes, CategoryCreationAttributes> {
    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => Image)
    imageId: string;

    @BelongsTo(() => Image)
    image: Image;

    @AllowNull(false)
    @Column
    @ForeignKey(() => Tag)
    tagId: string;

    @BelongsTo(() => Tag)
    tag: Tag;

    @AllowNull(true)
    @Column({ type: DataType.STRING })
    path: string | null;
}
