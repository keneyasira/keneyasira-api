import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTimeSlotDto {
    @ApiProperty({
        example: 'false',
        description: 'availability of the time slot',
    })
    @IsNotEmpty()
    available: boolean;

    @ApiProperty({
        example: '18f33b4c-6f7c-4af7-8d0f-3c50aab951ac',
        description: 'ID of the practician',
    })
    @IsNotEmpty()
    practicianId: string;

    @ApiProperty({
        example: 'f211f711-0e57-4c30-bbf2-7c9f576de879',
        description: 'ID of the establishment',
    })
    @IsNotEmpty()
    establishmentId: string;

    @ApiProperty({
        example: '2023-06-15 00:00:00.0',
        description: 'Start date and time of the time slot',
    })
    @IsNotEmpty()
    startDate: string;

    @ApiProperty({
        example: '2023-06-15 01:00:00.0',
        description: 'End date and time of the time slot',
    })
    @IsNotEmpty()
    endDate: string;

}