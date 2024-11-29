import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateEstablishmentTypeDto } from './create-establishment-type.dto';

export class UpdateEstablishmentTypeDto extends PartialType(CreateEstablishmentTypeDto) {
    @ApiProperty({
        example: '8a0adf31-d7fd-4960-b51c-18e8f59561d8',
        description: 'id of establishment type',
    })
    @IsNotEmpty()
    id: string;
}
