import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'buzz@disney.com', description: 'Email of the user' })
    email: string;

    @ApiProperty({ example: "l'Eclair", description: 'Last name of the user' })
    lastName: string;

    @ApiProperty({ example: 'Buzz', description: 'First name of the user' })
    firstName: string;

    @ApiProperty({ example: 's3cret!', description: 'Phone number of the user' })
    phone: string;

    @ApiProperty({ example: 's3cret!', description: 'Password of the user' })
    password: string;
}
