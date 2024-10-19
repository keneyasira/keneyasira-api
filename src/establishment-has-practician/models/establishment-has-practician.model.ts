import { Optional } from 'sequelize';
import { AllowNull, BelongsTo,Column, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import {
    Establishment,
    type EstablishmentAttributes,
} from '../../establishment/models/establishment.model';
import { Practician, type PracticianAttributes } from '../../practician/models/practician.model';

export interface EstablishmentHasPracticianAttributes extends BaseAttributes {
    practicianId: string;
    establishmentId: string;

    practician?: PracticianAttributes;
    establishment?: EstablishmentAttributes;
}

type EstablishmentHasPracticianCreationAttributes = Optional<
    EstablishmentHasPracticianAttributes,
    'id' | 'practician' | 'establishment'
>;

@Table({ tableName: 'establishment_has_practician' })
export class EstablishmentHasPractician extends BaseModel<
    EstablishmentHasPracticianAttributes,
    EstablishmentHasPracticianCreationAttributes
> {
    @AllowNull(false)
    @ForeignKey(() => Establishment)
    @Column
    establishmentId: string;

    @AllowNull(false)
    @ForeignKey(() => Practician)
    @Column
    practicianId: string;

    @BelongsTo(() => Establishment, 'establishmentId')
    establishment: Establishment;

    @BelongsTo(() => Practician, 'practicianId')
    practician: Practician;
}
