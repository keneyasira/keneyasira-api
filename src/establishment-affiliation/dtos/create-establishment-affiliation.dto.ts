import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEstablishmentAffiliationDto {
    @ApiProperty({
        example: 'public|private|mixed',
        description: 'establishment type',
    })
    @IsNotEmpty()
    name: string;
}
