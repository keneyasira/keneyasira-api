import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateEstablishmentAffiliationDto } from './create-establishment-affiliation.dto';

export class UpdateEstablishmentAffiliationDto extends PartialType(
    CreateEstablishmentAffiliationDto,
) {
    @ApiProperty({
        example: '8a0adf31-d7fd-4960-b51c-18e8f59561d8',
        description: 'id of establishment affiliation',
    })
    @IsNotEmpty()
    id: string;
}
