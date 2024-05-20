import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreatePatientDto } from './create-patient.dto';

export interface UpdatePatientPayload extends UpdatePatientDto {
    path?: string | null;
}
export class UpdatePatientDto extends PartialType(CreatePatientDto) {

    @ApiProperty({
        example: '1999-01-01',
        description: 'id of the patient',
    })
    @IsNotEmpty()
    id: string;
}
