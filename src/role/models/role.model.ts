import { Optional } from 'sequelize/dist';
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
import { User } from 'src/user/models/user.model';

export interface RoleAttributes extends BaseAttributes {
    name: string;
    description: string;
}

type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;
@Table({
    tableName: 'Role',
})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    description: string;

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
