import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEstablishmentTypeDto {
    @ApiProperty({
        example: 'hospital|dispensary|clinic',
        description: 'establishment type',
    })
    @IsNotEmpty()
    name: string;
}
