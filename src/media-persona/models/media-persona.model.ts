import { Optional } from 'sequelize/dist';
import { AllowNull, BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';

import { BaseAttributes, BaseModel } from '../../common/base.model';
import { Media } from '../../media/models/media.model';
import { Persona } from '../../persona/models/persona.model';

export interface MediaPersonaAttributes extends BaseAttributes {
    mediaId: string;
    personaId: string;
}

type MediaPersonaCreationAttributes = Optional<MediaPersonaAttributes, 'id'>;

@Table({
    tableName: 'media_persona',
})
export class MediaPersona extends BaseModel<
    MediaPersonaAttributes,
    MediaPersonaCreationAttributes
> {
    @AllowNull(false)
    @Column
    @ForeignKey(() => Media)
    mediaId: string;

    @BelongsTo(() => Media)
    media: Media;

    @AllowNull(true)
    @Column
    @ForeignKey(() => Persona)
    personaId: string;

    @BelongsTo(() => Persona)
    persona: Persona;
}
