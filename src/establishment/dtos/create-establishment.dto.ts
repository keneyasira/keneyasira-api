import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

export class CreateEstablishmentDto {
    @ApiProperty({
        example: 'Central Hospital',
        description: 'Name of the establishment',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: '123 Main St, City, Country',
        description: 'Address of the establishment',
    })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({
        example: 'Bamako',
        description: 'city of the establishment',
    })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({
        example: 'Mali',
        description: 'country of the establishment',
    })
    @IsNotEmpty()
    @IsString()
    country: string;

    @IsPhoneNumber('ML')
    @IsNotEmpty()
    @Transform(({ value }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = parsePhoneNumberFromString(value, 'ML');

        if (!result) {
            throw new BadRequestException();
        }

        return result.number as string;
    })
    @ApiProperty({
        example: '+22379131415',
        description: 'Phone number of the establishment',
    })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        example: 'info@centralhospital.com',
        description: 'Email address of the establishment',
    })
    @IsNotEmpty()
    @IsString()
    email: string;
}
