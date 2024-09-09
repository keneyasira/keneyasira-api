import { BaseAttributes, BaseModel } from 'src/common/base.model';
import { Column, Model, Table, ForeignKey, AllowNull, BelongsTo } from 'sequelize-typescript';
import { Practician } from '../../practician/models/practician.model';
import { Specialty } from '../../specialty/models/specialty.model';
import { Optional } from 'sequelize';

export interface PracticianHasSpecialtyAttributes extends BaseAttributes {
    specialtyId: string;
    practicianId: string;
}

type PracticianHasSpecialtyCreationAttributes = Optional<PracticianHasSpecialtyAttributes, 'id'>;
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
