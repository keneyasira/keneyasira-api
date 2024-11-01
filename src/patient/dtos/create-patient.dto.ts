import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

export class CreatePatientDto {
    @ApiProperty({ example: 'buzz@disney.com', description: 'Email of the patient' })
    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "l'Eclair", description: 'Last name of the patient' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'Buzz', description: 'First name of the patient' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: '002239717410', description: 'Phone number of the patient' })
    @IsPhoneNumber('ML')
    @Transform(({ value }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = parsePhoneNumberFromString(value, 'ML');

        if (!result) {
            throw new BadRequestException();
        }

        return result.number;
    })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        example: '2024-10-29T18:50:31Z',
        description: 'birth date of the patient',
    })
    @IsDateString()
    @IsOptional()
    @IsNotEmpty()
    birthDate: string;
}
