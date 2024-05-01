import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { CreatePatientDto } from './create-patient.dto';

export interface UpdatePatientPayload extends UpdatePatientDto {
    path?: string | null;
}
export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    @ApiProperty({
        example: 'ba606254-e8df-4d5a-9e99-f14fb5871253',
        description: 'id of the category',
    })
    @IsNotEmpty()
    id: string;
}
