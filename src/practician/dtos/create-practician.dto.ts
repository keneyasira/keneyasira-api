import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePracticianDto {
    @ApiProperty({ example: 'buzz@disney.com', description: 'Email of the user' })
    @IsOptional()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "l'Eclair", description: 'Last name of the user' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'Buzz', description: 'First name of the user' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: '002239717410', description: 'Phone number of the user' })
    @IsNotEmpty()
    phone: string;

}
