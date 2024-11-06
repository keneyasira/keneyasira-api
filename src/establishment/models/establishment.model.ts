import { Optional } from 'sequelize';
import { AllowNull, BelongsToMany, Column, HasMany, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { EstablishmentHasSpecialty } from '../../establishment-has-specialty/models/establishment-has-specialty.model';
import { Specialty } from '../../specialty/models/specialty.model';
import { TimeSlot, type TimeSlotAttributes } from '../../time-slot/models/time-slot.model';

export interface EstablishmentAttributes extends BaseAttributes {
    name: string;
    description?: string;
    address: string;
    phone: string;
    city: string;
    country: string;
    timeSlots?: TimeSlotAttributes[];
}

type EstablishmentCreationAttributes = Optional<
    EstablishmentAttributes,
    'id' | 'timeSlots' | 'description'
>;

@Table({
    tableName: 'establishment',
})
export class Establishment extends BaseModel<
    EstablishmentAttributes,
    EstablishmentCreationAttributes
> {
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(true)
    @Column
    description?: string;

    @AllowNull(false)
    @Column
    address: string;

    @AllowNull(false)
    @Column
    phone: string;

    @AllowNull(false)
    @Column
    city: string;

    @AllowNull(false)
    @Column
    country: string;

    @HasMany(() => TimeSlot)
    timeSlots: TimeSlot[];

    @BelongsToMany(() => Specialty, () => EstablishmentHasSpecialty)
    specialties: Specialty[];
}
