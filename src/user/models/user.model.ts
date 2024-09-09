import { Optional } from 'sequelize';
import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

import { BaseAttributes } from '../../common/base.model';

export interface UserAttributes extends BaseAttributes {
    id: string;
    email: string;
    phone: string;
    lastName: string;
    firstName: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;
@Table({
    tableName: 'user',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @Column
    phone: string;

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
