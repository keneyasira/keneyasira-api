import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSpecialtyDto {
    @ApiProperty({
        example: 'genecologist',
        description: 'medical specialty',
    })
    @IsNotEmpty()
    name: string;
}
