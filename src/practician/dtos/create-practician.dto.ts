import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';
export class CreatePracticianDto {
    @ApiProperty({ example: 'buzz@disney.com', description: 'Email of the user' })
    @IsEmail()
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
}
