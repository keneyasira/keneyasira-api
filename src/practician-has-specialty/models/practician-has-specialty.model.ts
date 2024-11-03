import { Optional } from 'sequelize';
import { AllowNull, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { Practician, type PracticianAttributes } from '../../practician/models/practician.model';
import { Specialty, type SpecialtyAttributes } from '../../specialty/models/specialty.model';

export interface PracticianHasSpecialtyAttributes extends BaseAttributes {
    specialtyId: string;
    practicianId: string;

    practician?: PracticianAttributes;
    specialty?: SpecialtyAttributes;
}

type PracticianHasSpecialtyCreationAttributes = Optional<
    PracticianHasSpecialtyAttributes,
    'id' | 'practician' | 'specialty'
>;
@Table({ tableName: 'practician_has_specialty' })
export class PracticianHasSpecialty extends BaseModel<
    PracticianHasSpecialtyAttributes,
    PracticianHasSpecialtyCreationAttributes
> {
    @AllowNull(false)
    @ForeignKey(() => Practician)
    @Column
    practicianId: string;

    @AllowNull(false)
    @ForeignKey(() => Specialty)
    @Column
    specialtyId: string;

    @BelongsTo(() => Practician, 'practicianId')
    practician: Practician;

    @BelongsTo(() => Specialty, 'specialtyId')
    specialty: Specialty;
}
