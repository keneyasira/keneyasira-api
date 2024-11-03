import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
    @ApiProperty({
        example: 'dc324739-3b2a-4cb9-8bea-0102dd7d2d50',
        description: 'id of the admin',
    })
    @IsNotEmpty()
    id: string;
}