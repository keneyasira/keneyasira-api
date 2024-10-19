import { Optional } from 'sequelize';
import { AllowNull, BelongsTo,Column, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { User, type UserAttributes } from '../../user/models/user.model';

export interface PracticianAttributes extends BaseAttributes {
    id: string;
    userId: string;

    user?: UserAttributes;
}

type PracticianCreationAttributes = Optional<PracticianAttributes, 'id' | 'user'>;
@Table({
    tableName: 'practician',
})
export class Practician extends BaseModel<PracticianAttributes, PracticianCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => User)
    userId: string;

    @BelongsTo(() => User, 'userId')
    user: User;
}
