import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateAppointmentStatusDto } from './create-appointment-status.dto';

export class UpdateAppointmentStatusDto extends PartialType(CreateAppointmentStatusDto) {
    @ApiProperty({
        example: '8a0adf31-d7fd-4960-b51c-18e8f59561d8',
        description: 'id of appointment status',
    })
    @IsNotEmpty()
    id: string;
}   