import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

export class PasswordLessLoginOtpDto {
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
    phoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
