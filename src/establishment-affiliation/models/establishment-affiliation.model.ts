import { Optional } from 'sequelize';
import { AllowNull, Column, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';

export interface EstablishmentAffiliationAttributes extends BaseAttributes {
    name: string;
}

type EstablishmentAffiliationCreationAttributes = Optional<
    EstablishmentAffiliationAttributes,
    'id'
>;
@Table({
    tableName: 'establishment_affiliation',
})
export class EstablishmentAffiliation extends BaseModel<
    EstablishmentAffiliationAttributes,
    EstablishmentAffiliationCreationAttributes
> {
    @AllowNull(false)
    @Column
    name: string;
}
