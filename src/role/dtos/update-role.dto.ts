import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({
        example: '8a0adf31-d7fd-4960-b51c-18e8f59561d8',
        description: 'id of the role',
    })
    @IsNotEmpty()
    id: string;
}
