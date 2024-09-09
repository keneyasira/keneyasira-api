import { Optional } from 'sequelize';
import { AllowNull, Column, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';

export interface AppointmentStatusAttributes extends BaseAttributes {
    name: string;
}

type SpecialtyCreationAttributes = Optional<AppointmentStatusAttributes, 'id'>;
@Table({
    tableName: 'appointment_status',
})
export class AppointmentStatus extends BaseModel<AppointmentStatusAttributes, SpecialtyCreationAttributes> {
    @AllowNull(false)
    @Column
    name: string;
}
