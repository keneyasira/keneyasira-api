import { BaseAttributes, BaseModel } from "src/common/base.model";
import { Optional } from "sequelize";
import { Table, Column, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/user/models/user.model";

export interface PracticianAttributes extends BaseAttributes {
    id: string,
    userId: string,
}

type PracticianCreationAttributes = Optional<PracticianAttributes, 'id'>;
@Table({
    tableName: 'practician',
})
export class Practician extends BaseModel<PracticianAttributes, PracticianCreationAttributes> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => User)
    userId: string;

    @BelongsTo(() => User, 'userId')
    user: User;
}
