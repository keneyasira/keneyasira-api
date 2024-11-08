import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

import { type ClientType, ClientTypes } from '../strategies/magic-login.strategy';

export class PasswordLessLoginDto {
    @IsPhoneNumber('ML')
    @IsNotEmpty()
    @Transform(({ value }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = parsePhoneNumberFromString(value, 'ML');

        if (!result) {
            throw new BadRequestException();
        }

        return result.number;
    })
    @IsOptional()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @ApiProperty({
        enum: ClientTypes,
        description: 'Type of client application making the request',
        example: ClientTypes.PATIENT,
    })
    @IsEnum(ClientTypes)
    @IsNotEmpty()
    clientType: ClientType;
}
