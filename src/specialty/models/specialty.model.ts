import { Optional } from 'sequelize/dist';
import { AllowNull, Column, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';

export interface SpecialtyAttributes extends BaseAttributes {
    name: string;
}

type SpecialtyCreationAttributes = Optional<SpecialtyAttributes, 'id'>;
@Table({
    tableName: 'specialty',
})
export class Specialty extends BaseModel<SpecialtyAttributes, SpecialtyCreationAttributes> {
    @AllowNull(false)
    @Column
    name: string;
}
