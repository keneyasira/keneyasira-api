import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthenticationService } from '../authentication.service';
import { ApplicationLoggerService } from '../../core/logger/application.logger.service';
import { Config } from '@config/default';
import type { UserAttributes } from '../../user/models/user.model';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authenticationService: AuthenticationService,
        private readonly logger: ApplicationLoggerService,
        private readonly config: Config,
    ) {
        super({
            secret: 'secret', // get this from env vars
            jwtOptions: {
                expiresIn: '5m',
            },
            callbackUrl: 'http://localhost:4000/authentication/login/callback',
            sendMagicLink: async (destination: string, href: string) => {
                // TODO: send email or sms
                this.logger.info(
                    // `sending sms to ${phoneNumber} with Link ${config.client.loginUrl}${href}`,
                    `sending sms to ${destination} with Link ${href}`,
                );
            },
            verify: async (
                payload: { destination: string },
                callback: (arg: null, user: Promise<UserAttributes | undefined>) => any,
            ) => {
                callback(null, this.validate(payload));
            },
        });
    }

    async validate(payload: { destination: string }) {
        const result = await this.authenticationService.validateUser(payload.destination);
        if (!result) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        return result;
    }
}
