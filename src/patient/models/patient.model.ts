import { Optional } from 'sequelize';
import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Table,
} from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { User, type UserAttributes } from '../../user/models/user.model';

export interface PatientAttributes extends BaseAttributes {
    userId: string;
    birthDate: string;

    user?: UserAttributes;
}

type PatientCreationAttributes = Optional<PatientAttributes, 'id' | 'user'>;

@Table({
    tableName: 'patient',
})
export class Patient extends BaseModel<PatientAttributes, PatientCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => User)
    userId: string;

    @AllowNull(false)
    @Default(new Date())
    @Column({
        type: DataType.DATE,
    })
    birthDate: string;

    @BelongsTo(() => User, 'userId')
    user: User;
}
