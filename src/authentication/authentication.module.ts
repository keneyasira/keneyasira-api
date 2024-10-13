// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CoreModule } from '../core/core.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
    imports: [
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
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
