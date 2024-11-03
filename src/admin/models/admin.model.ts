import { Optional } from 'sequelize';
import { AllowNull, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { User, type UserAttributes } from '../../user/models/user.model';

export interface AdminAttributes extends BaseAttributes {
    id: string;
    userId: string;

    user?: UserAttributes;
}

type AdminCreationAttributes = Optional<AdminAttributes, 'id' | 'user'>;
@Table({
    tableName: 'admin',
})
export class Admin extends BaseModel<AdminAttributes, AdminCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => User)
    userId: string;

    @BelongsTo(() => User, 'userId')
    user: User;
}