import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePatientDto {
    @ApiProperty({
        example: '7dd8c26b-9428-40c2-ac11-b2e6ce2da42e',
        description: 'uuid of the user associated to the patient',
    })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        example: '1999-01-01',
        description: 'birth date of the patient',
    })
    @IsOptional()
    @IsNotEmpty()
    birthDate: string;

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
