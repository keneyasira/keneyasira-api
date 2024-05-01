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
import { Role } from 'src/role/models/role.model';

export interface UserRoleAttributes extends BaseAttributes {
    name: string;
    description: string;
}

type RoleCreationAttributes = Optional<UserRoleAttributes, 'id'>;
@Table({
    tableName: 'user_has_role',
})
export class UserRole extends Model<UserRoleAttributes, RoleCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => User)
    userId: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => Role)
    roleId: string;

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
