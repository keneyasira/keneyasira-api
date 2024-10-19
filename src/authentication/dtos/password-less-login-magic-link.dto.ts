import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

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
}
