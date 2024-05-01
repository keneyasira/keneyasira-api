import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [CoreModule],
    exports: [RoleService],
})
export class RoleModule {}
