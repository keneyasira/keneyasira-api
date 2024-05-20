import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
    @ApiProperty({
        example: '7dd8c26b-9428-40c2-ac11-b2e6ce2da42e',
        description: 'uuid of the user associated to the patient',
    })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        example: '1999-01-01',
        description: 'birth date of the patient',
    })
    @IsNotEmpty()
    birthDate: string;
}
