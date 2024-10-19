import { Optional } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { Establishment, type EstablishmentAttributes } from '../../establishment/models/establishment.model';
import { Practician, type PracticianAttributes } from '../../practician/models/practician.model';

export interface TimeSlotAttributes extends BaseAttributes {
    establishmentId: string;
    practicianId: string;
    available: boolean;
    startDate: string;
    endDate: string;

    practician?: PracticianAttributes;
    establishment?: EstablishmentAttributes;
}
type TimeSlotCreationAttributes = Optional<
    TimeSlotAttributes,
    'id' | 'practician' | 'establishment'
>;
@Table({ tableName: 'time_slot' })
export class TimeSlot extends BaseModel<TimeSlotAttributes, TimeSlotCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => Establishment)
    establishmentId: string;

    @AllowNull(true)
    @Column
    @ForeignKey(() => Practician)
    practicianId: string;

    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    available: boolean;

    @AllowNull(false)
    @Column({
        type: DataType.DATE,
    })
    startDate: string;

    @AllowNull(false)
    @Column({
        type: DataType.DATE,
    })
    endDate: string;

    @BelongsTo(() => Establishment, 'establishmentId')
    establishment: Establishment;

    @BelongsTo(() => Practician, 'practicianId')
    practician: Practician;
}
