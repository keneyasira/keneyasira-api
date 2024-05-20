import { Optional } from 'sequelize/dist';
import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    Table,
} from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { User } from '../../user/models/user.model';
import { Role } from '../../role/models/role.model';

export interface UserRoleAttributes extends BaseAttributes {
    userId: string;
    roleId: string;
}

type RoleCreationAttributes = Optional<UserRoleAttributes, 'id'>;
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

    @BelongsTo(() => Role)
    role: Role;
}
