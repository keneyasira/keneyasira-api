import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAppointmentDto {
    @ApiProperty({
        example: '7dd8c26b-9428-40c2-ac11-b2e6ce2da42e',
        description: 'id of the patient',
    })
    @IsNotEmpty()
    patientId: string;

    @ApiProperty({
        example: '7dd8c26b-9428-40c2-ac11-b2e6ce2da42e',
        description: 'id of the time slot',
    })
    @IsNotEmpty()
    timeSlotId: string;
}
