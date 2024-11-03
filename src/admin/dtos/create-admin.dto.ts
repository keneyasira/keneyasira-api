import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

export class CreateAdminDto {
    @ApiProperty({ example: 'admin@example.com', description: 'Email of the admin' })
    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the admin' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'John', description: 'First name of the admin' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: '002239717410', description: 'Phone number of the admin' })
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