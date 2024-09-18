import { Optional } from 'sequelize';
import { AllowNull, Column, HasMany, Table } from 'sequelize-typescript';
import { BaseAttributes, BaseModel } from '../../common/base.model';
import { TimeSlot } from '../../time-slot/models/time-slot.model';

export interface EstablishmentAttributes extends BaseAttributes {
    name: string;
    address: string;
    city: string,
    country: string,
}

type EstablishmentCreationAttributes = Optional<EstablishmentAttributes, 'id'>;

@Table({
    tableName: 'establishment',
})
export class Establishment extends BaseModel<EstablishmentAttributes, EstablishmentCreationAttributes> {
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    address: string;

    @AllowNull(false)
    @Column
    city: string;

    @AllowNull(false)
    @Column
    country: string;

    @HasMany(() => TimeSlot)
    timeSlots: TimeSlot[];
}