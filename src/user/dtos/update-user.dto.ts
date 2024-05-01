import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        example: 'dc324739-3b2a-4cb9-8bea-0102dd7d2d50',
        description: 'id of the user',
    })
    @IsNotEmpty()
    id: string;
}
