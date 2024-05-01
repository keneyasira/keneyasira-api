import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { MediaPersonaController } from './media-persona.controller';
import { MediaPersonaService } from './media-persona.service';

@Module({
    providers: [MediaPersonaService],
    controllers: [MediaPersonaController],
    imports: [CoreModule],
    exports: [MediaPersonaService],
})
export class MediaPersonaModule {}
