import { Optional } from 'sequelize';
import { AllowNull, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { User, type UserAttributes } from '../../user/models/user.model';

export interface CollaboratorAttributes extends BaseAttributes {
    id: string;
    userId: string;

    user?: UserAttributes;
}

type CollaboratorCreationAttributes = Optional<CollaboratorAttributes, 'id' | 'user'>;
@Table({
    tableName: 'collaborator',
})
export class Collaborator extends BaseModel<CollaboratorAttributes, CollaboratorCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => User)
    userId: string;

    @BelongsTo(() => User, 'userId')
    user: User;
}