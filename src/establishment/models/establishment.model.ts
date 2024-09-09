import { Optional } from 'sequelize';
import { AllowNull, Column, HasMany, Table } from 'sequelize-typescript';
import { BaseAttributes, BaseModel } from '../../common/base.model';
import { TimeSlot } from '../../time-slot/models/time-slot.model';

export interface EstablishmentAttributes extends BaseAttributes {
    name: string;
    address: string;
}

type EstablishmentCreationAttributes = Optional<EstablishmentAttributes, 'id'>;

@Table({
    tableName: 'establishments',
})
export class Establishment extends BaseModel<EstablishmentAttributes, EstablishmentCreationAttributes> {
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    address: string;

    @HasMany(() => TimeSlot)
    timeSlots: TimeSlot[];
}