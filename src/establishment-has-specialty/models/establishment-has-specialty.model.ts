import { BaseAttributes, BaseModel } from 'src/common/base.model';
import { Column, Model, Table, ForeignKey, AllowNull, BelongsTo } from 'sequelize-typescript';
import { Establishment } from '../../establishment/models/establishment.model';
import { Specialty } from '../../specialty/models/specialty.model';
import { Optional } from 'sequelize';

export interface EstablishmentHasSpecialtyAttributes extends BaseAttributes {
    specialtyId: string;
    establishmentId: string;
}

type EstablishmentHasSpecialtyCreationAttributes = Optional<EstablishmentHasSpecialtyAttributes, 'id'>;

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