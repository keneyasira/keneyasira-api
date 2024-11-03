import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import parsePhoneNumberFromString from 'libphonenumber-js';

export class CreateCollaboratorDto {
    @ApiProperty({ example: 'collaborator@example.com', description: 'Email of the collaborator' })
    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the collaborator' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'John', description: 'First name of the collaborator' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: '002239717410', description: 'Phone number of the collaborator' })
    @IsPhoneNumber('ML')
    @Transform(({ value }) => {
        const result = parsePhoneNumberFromString(value, 'ML');
        if (!result) {
            throw new BadRequestException();
        }
        return result.number;
    })
    @IsNotEmpty()
    phone: string;
}