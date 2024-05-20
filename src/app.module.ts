import { Module } from '@nestjs/common';

import { SpecialtyModule } from './specialty/specialty.module';
import { CoreModule } from './core/core.module';
import { RootController } from './core/root.controller';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
    imports: [
        CoreModule,
        PatientModule,
        SpecialtyModule,
        RoleModule,
        UserModule,
        UserRoleModule,
    ],
    controllers: [RootController],
})
export class AppModule {}
