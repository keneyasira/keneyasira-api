import { BaseAttributes, BaseModel } from '../../common/base.model';
import { Column, Model, Table, ForeignKey, AllowNull, BelongsTo } from 'sequelize-typescript';
import { Establishment } from '../../establishment/models/establishment.model';
import { Practician } from '../../practician/models/practician.model';
import { Optional } from 'sequelize';

export interface EstablishmentHasPracticianAttributes extends BaseAttributes {
    practicianId: string;
    establishmentId: string;
}

type EstablishmentHasPracticianCreationAttributes = Optional<
    EstablishmentHasPracticianAttributes,
    'id'
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
