// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CoreModule } from '../core/core.module';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'secret', // TODO get from config module
            signOptions: {
                expiresIn: '1h',
            },
        }),
        CoreModule,
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, MagicLoginStrategy, JwtStrategy],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
