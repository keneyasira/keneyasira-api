import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateEstablishmentDto } from './create-establishment.dto';

export class UpdateEstablishmentDto extends PartialType(CreateEstablishmentDto) {
    @ApiProperty({
        example: '8a0adf31-d7fd-4960-b51c-18e8f59561d8',
        description: 'id of establishment',
    })
    @IsNotEmpty()
    @IsUUID()
    id: string;
}