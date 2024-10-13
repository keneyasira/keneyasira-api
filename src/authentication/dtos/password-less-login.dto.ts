import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, isPhoneNumber, IsPhoneNumber } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

export class PasswordLessLoginDto {
    @IsPhoneNumber('ML')
    @IsNotEmpty()
    @Transform(({ value }) => {
        const result = parsePhoneNumberFromString(value, 'ML');
        if (!result) {
            throw new BadRequestException();
        }
        return result.number;
    })
    destination: string;
}
