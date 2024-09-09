import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

    @ApiProperty({
        example: '',
        description: 'longitude of the establishmen',
    })
    @IsNotEmpty()
    @IsString()
    longitude: number;


    @ApiProperty({
        example: '',
        description: 'latitude of the establishment',
    })
    @IsNotEmpty()
    @IsString()
    latitude: number;

    @ApiProperty({
        example: '+1234567890',
        description: 'Phone number of the establishment',
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        example: 'info@centralhospital.com',
        description: 'Email address of the establishment',
    })
    @IsNotEmpty()
    @IsString()
    email: string;
}