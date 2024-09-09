import { Optional } from 'sequelize';
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { BaseAttributes, BaseModel } from 'src/common/base.model';
import { Establishment } from '../../establishment/models/establishment.model';
import { Practician } from 'src/practician/models/practician.model';

export interface TimeSlotAttributes extends BaseAttributes {
    establishmentId: string;
    practicianId: string;
    available: boolean;
    startDate: string;
    endDate: string;
}
type TimeSlotCreationAttributes = Optional<TimeSlotAttributes, 'id'>;
export class TimeSlot extends BaseModel<TimeSlotAttributes, TimeSlotCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => Establishment)
    establishmentId: string;

    @AllowNull(false)
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
