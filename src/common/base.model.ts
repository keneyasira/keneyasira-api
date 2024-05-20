import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    UpdatedAt,
} from 'sequelize-typescript';

import { User } from '../user/models/user.model';

export interface BaseAttributes {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    deletedBy?: string;
}

export class BaseModel<Attributes extends {}, CreationAttributes extends {}> extends Model<
    Attributes,
    CreationAttributes
> {
    @PrimaryKey
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @CreatedAt
    createdAt!: string;

    @UpdatedAt
    updatedAt!: string;

    @DeletedAt
    deletedAt!: string;

    @Column
    @ForeignKey(() => User)
    createdBy?: string;

    @Column
    @ForeignKey(() => User)
    updatedBy?: string;

    @Column
    @ForeignKey(() => User)
    deletedBy?: string;
}
