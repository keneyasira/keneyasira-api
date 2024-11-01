import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { UserRoleController } from './user-role.controller';
import { UserRoleEventListener } from './user-role.event.listener';
import { UserRoleService } from './user-role.service';

@Module({
    controllers: [UserRoleController],
    providers: [UserRoleService, UserRoleEventListener],
    exports: [UserRoleService, UserRoleEventListener],
    imports: [CoreModule],
})
export class UserRoleModule {}
