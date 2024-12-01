import { Optional } from 'sequelize';
import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    HasMany,
    Table,
} from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import {
    EstablishmentAffiliation,
    type EstablishmentAffiliationAttributes,
} from '../../establishment-affiliation/models/establishment-affiliation.model';
import { EstablishmentHasPractician } from '../../establishment-has-practician/models/establishment-has-practician.model';
import { EstablishmentHasSpecialty } from '../../establishment-has-specialty/models/establishment-has-specialty.model';
import {
    EstablishmentType,
    type EstablishmentTypeAttributes,
} from '../../establishment-type/models/establishment-type.model';
import { Practician } from '../../practician/models/practician.model';
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
    establishmentTypeId: string;
    establishmentAffiliationId: string;
    type?: EstablishmentTypeAttributes;
    affiliation?: EstablishmentAffiliationAttributes;
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

    @AllowNull(false)
    @Column
    @ForeignKey(() => EstablishmentAffiliation)
    establishmentAffiliationId: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => EstablishmentType)
    establishmentTypeId: string;

    @HasMany(() => TimeSlot)
    timeSlots: TimeSlot[];

    @BelongsToMany(() => Specialty, () => EstablishmentHasSpecialty)
    specialties: Specialty[];

    @BelongsToMany(() => Practician, () => EstablishmentHasPractician)
    practicians: Practician[];

    @BelongsTo(() => EstablishmentAffiliation)
    affiliation: EstablishmentAffiliation;

    @BelongsTo(() => EstablishmentType)
    type: EstablishmentType;
}
