import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { EstablishmentAffiliationController } from './establishment-affiliation.controller';
import { EstablishmentAffiliationService } from './establishment-affiliation.service';

@Module({
    providers: [EstablishmentAffiliationService],
    controllers: [EstablishmentAffiliationController],
    imports: [CoreModule],
    exports: [EstablishmentAffiliationService],
})
export class EstablishmentAffiliationModule {}
