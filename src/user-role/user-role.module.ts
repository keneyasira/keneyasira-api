import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';

@Module({
    controllers: [UserRoleController],
    providers: [UserRoleService],
    exports: [UserRoleService],
    imports: [CoreModule],
})
export class UserRoleModule {}
