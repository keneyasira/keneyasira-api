import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateUserRoleDto } from './create-user-role.dto';

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {
    @ApiProperty({
        example: 'dc324739-3b2a-4cb9-8bea-0102dd7d2d50',
        description: 'id of the entity',
    })
    @IsNotEmpty()
    id: string;
}
