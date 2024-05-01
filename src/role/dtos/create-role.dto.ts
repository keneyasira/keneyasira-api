import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        example: 'stagiaire',
        description: 'name of the role',
    })
    name: string;

    @ApiProperty({
        example: 'il doit faire le café',
        description: 'description of the role',
    })
    description: string;
}
