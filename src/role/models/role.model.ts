import { Optional } from 'sequelize';
import {
    AllowNull,
    Column,
    DataType,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';

export interface RoleAttributes extends BaseAttributes {
    name: string;
    description: string;
}

type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;
@Table({
    tableName: 'role',
})
export class Role extends BaseModel<RoleAttributes, RoleCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    description: string;
}
