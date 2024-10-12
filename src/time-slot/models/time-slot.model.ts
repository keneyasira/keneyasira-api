import { Optional } from 'sequelize';
import { AllowNull, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseAttributes, BaseModel } from '../../common/base.model';
import { Establishment } from '../../establishment/models/establishment.model';
import { Practician } from '../../practician/models/practician.model';

export interface TimeSlotAttributes extends BaseAttributes {
    establishmentId: string;
    practicianId: string;
    available: boolean;
    startDate: string;
    endDate: string;
}
type TimeSlotCreationAttributes = Optional<TimeSlotAttributes, 'id'>;
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
}
