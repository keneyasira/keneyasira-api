import { Optional } from 'sequelize';
import { AllowNull, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { Role, type RoleAttributes } from '../../role/models/role.model';
import { User, type UserAttributes } from '../../user/models/user.model';

export interface UserRoleAttributes extends BaseAttributes {
    userId: string;
    roleId: string;
    role?: RoleAttributes;
    user?: UserAttributes;
}

type RoleCreationAttributes = Optional<UserRoleAttributes, 'id' | 'role' | 'user'>;
@Table({
    tableName: 'user_role',
})
export class UserRole extends BaseModel<UserRoleAttributes, RoleCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => User)
    userId: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => Role)
    roleId: string;

    @BelongsTo(() => User, 'userId')
    user: User;

    @BelongsTo(() => Role, 'roleId')
    role: Role;
}
