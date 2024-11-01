// auth.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CoreModule } from '../core/core.module';
import { UserModule } from '../user/user.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';

@Module({
    imports: [
        UserModule,
        UserRoleModule,
        PassportModule,
        JwtModule.register({
            secret: 'secret', // TODO get from config module
            global: true,
            signOptions: {
                expiresIn: '1h',
            },
        }),
        CoreModule,
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        MagicLoginStrategy,
        JwtStrategy,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard,
        // },
    ],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
