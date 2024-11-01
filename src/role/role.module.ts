import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { CoreModule } from '../core/core.module';
import { RolesGuard } from './guards/roles.guard';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    controllers: [RoleController],
    providers: [
        RoleService,
        // {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard,
        // },
    ],
    imports: [CoreModule],
    exports: [RoleService],
})
export class RoleModule {}
