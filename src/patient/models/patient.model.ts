import { Optional } from 'sequelize/dist';
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, Default, DeletedAt, ForeignKey, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { User } from '../../user/models/user.model';

export interface PatientAttributes extends BaseAttributes {
    userId: string;
    birthDate: string;
}

type PatientCreationAttributes = Optional<PatientAttributes, 'id'>;

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
