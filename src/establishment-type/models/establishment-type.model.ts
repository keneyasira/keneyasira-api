import { Optional } from 'sequelize';
import { AllowNull, Column, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';

export interface EstablishmentTypeAttributes extends BaseAttributes {
    name: string;
}

type EstablishmentTypeCreationAttributes = Optional<EstablishmentTypeAttributes, 'id'>;
@Table({
    tableName: 'establishment_type',
})
export class EstablishmentType extends BaseModel<
    EstablishmentTypeAttributes,
    EstablishmentTypeCreationAttributes
> {
    @AllowNull(false)
    @Column
    name: string;
}
