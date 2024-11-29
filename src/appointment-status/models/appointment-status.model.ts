import { Optional } from 'sequelize';
import { AllowNull, Column, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';

export interface AppointmentStatusAttributes extends BaseAttributes {
    name: string;
}

type AppointmentStatusCreationAttributes = Optional<AppointmentStatusAttributes, 'id'>;
@Table({
    tableName: 'appointment_status',
})
export class AppointmentStatus extends BaseModel<AppointmentStatusAttributes, AppointmentStatusCreationAttributes> {
    @AllowNull(false)
    @Column
    name: string;
}
