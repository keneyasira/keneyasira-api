import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreatePracticianDto } from './create-practician.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePracticianDto extends PartialType(CreatePracticianDto) {
    @ApiProperty({
        example: 'dc324739-3b2a-4cb9-8bea-0102dd7d2d50',
        description: 'id of the practician',
    })
    @IsNotEmpty()
    id: string;
}