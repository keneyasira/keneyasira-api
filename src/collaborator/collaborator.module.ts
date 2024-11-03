import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorService } from './collaborator.service';

@Module({
    controllers: [CollaboratorController],
    providers: [CollaboratorService],
    exports: [CollaboratorService],
    imports: [CoreModule],
})
export class CollaboratorModule {}