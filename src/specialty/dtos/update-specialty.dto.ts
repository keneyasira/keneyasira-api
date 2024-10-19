import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateSpecialtyDto } from './create-specialty.dto';

export class UpdateSpecialtyDto extends PartialType(CreateSpecialtyDto) {
    @ApiProperty({
        example: '8a0adf31-d7fd-4960-b51c-18e8f59561d8',
        description: 'id of the specialty',
    })
    @IsNotEmpty()
    id: string;
}
