import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMediaPersonaDto {
    @ApiProperty({
        example: '7dd8c26b-9428-40c2-ac11-b2e6ce2da42e',
        description: 'uuid of the media',
    })
    @IsNotEmpty()
    mediaId: string;

    @ApiProperty({
        example: '7dd8c26b-9428-40c2-ac11-b2e6ce2da42e',
        description: 'uuid of the persona',
    })
    @IsNotEmpty()
    personaId: string;
}
