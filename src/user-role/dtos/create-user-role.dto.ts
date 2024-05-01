import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
    @ApiProperty({
        example: '7dd8c26b-9428-40c2-ac11-b2e6ce2da42e',
        description: 'id of the user',
    })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        example: '7dd8c26b-9428-40c2-ac11-b2e6ce2da42e',
        description: 'id of the role',
    })
    @IsNotEmpty()
    roleId: string;
}
