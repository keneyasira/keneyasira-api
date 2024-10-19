import { Optional } from 'sequelize';
import { AllowNull, Column, HasMany, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { TimeSlot, type TimeSlotAttributes } from '../../time-slot/models/time-slot.model';

export interface EstablishmentAttributes extends BaseAttributes {
    name: string;
    address: string;
    phone: string;
    city: string;
    country: string;
    timeSlots?: TimeSlotAttributes[];
}

type EstablishmentCreationAttributes = Optional<EstablishmentAttributes, 'id' | 'timeSlots'>;

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
}
