import { Optional } from 'sequelize';
import { AllowNull, BelongsTo,Column, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import {
    Establishment,
    type EstablishmentAttributes,
} from '../../establishment/models/establishment.model';
import { Specialty, type SpecialtyAttributes } from '../../specialty/models/specialty.model';

export interface EstablishmentHasSpecialtyAttributes extends BaseAttributes {
    specialtyId: string;
    establishmentId: string;

    establishment: EstablishmentAttributes;
    specialty: SpecialtyAttributes;
}

type EstablishmentHasSpecialtyCreationAttributes = Optional<
    EstablishmentHasSpecialtyAttributes,
    'id' | 'establishment' | 'specialty'
>;

@Table({ tableName: 'establishment_has_specialty' })
export class EstablishmentHasSpecialty extends BaseModel<
    EstablishmentHasSpecialtyAttributes,
    EstablishmentHasSpecialtyCreationAttributes
> {
    @AllowNull(false)
    @ForeignKey(() => Establishment)
    @Column
    establishmentId: string;

    @AllowNull(false)
    @ForeignKey(() => Specialty)
    @Column
    specialtyId: string;

    @BelongsTo(() => Establishment, 'establishmentId')
    establishment: Establishment;

    @BelongsTo(() => Specialty, 'specialtyId')
    specialty: Specialty;
}
