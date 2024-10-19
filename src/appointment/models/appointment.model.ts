import { Optional } from 'sequelize';
import { AllowNull, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import {
    AppointmentStatus,
    type AppointmentStatusAttributes,
} from '../../appointment-status/models/appointment-status.model';
import { BaseAttributes, BaseModel } from '../../common/base.model';
import {
    Establishment,
    type EstablishmentAttributes,
} from '../../establishment/models/establishment.model';
import { Patient, type PatientAttributes } from '../../patient/models/patient.model';
import { Practician, type PracticianAttributes } from '../../practician/models/practician.model';
import { TimeSlot, type TimeSlotAttributes } from '../../time-slot/models/time-slot.model';

export interface AppointmentAttributes extends BaseAttributes {
    establishmentId: string;
    practicianId: string;
    patientId: string;
    appointmentStatusId: string;
    timeSlotId: string;

    establishment?: EstablishmentAttributes;
    practician?: PracticianAttributes;
    patient?: PatientAttributes;
    appointmentStatus?: AppointmentStatusAttributes;
    timeSlot?: TimeSlotAttributes;
}

type AppointmentCreationAttributes = Optional<
    AppointmentAttributes,
    'id' | 'establishment' | 'practician' | 'patient' | 'appointmentStatus' | 'timeSlot'
>;
@Table({
    tableName: 'appointment',
})
export class Appointment extends BaseModel<AppointmentAttributes, AppointmentCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => Establishment)
    establishmentId: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => Practician)
    practicianId: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => Patient)
    patientId: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => AppointmentStatus)
    appointmentStatusId: string;

    @AllowNull(false)
    @Column
    @ForeignKey(() => TimeSlot)
    timeSlotId: string;

    @BelongsTo(() => Establishment, 'establishmentId')
    establishment: Establishment;

    @BelongsTo(() => Practician, 'practicianId')
    practician: Practician;

    @BelongsTo(() => Patient, 'patientId')
    patient: Patient;

    @BelongsTo(() => AppointmentStatus, 'appointmentStatusId')
    appointmentStatus: AppointmentStatus;

    @BelongsTo(() => TimeSlot, 'timeSlotId')
    timeslot: TimeSlot;
}
