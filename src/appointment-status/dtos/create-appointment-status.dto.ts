import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentStatusDto {
    @ApiProperty({
        example: 'cancelled|completed|scheduled',
        description: 'appointment status',
    })
    @IsNotEmpty()
    name: string;
}
