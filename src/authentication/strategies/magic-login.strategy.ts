import { Config } from '@config/default';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';

import { ApplicationLoggerService } from '../../core/logger/application.logger.service';
import type { UserAttributes } from '../../user/models/user.model';
import { AuthenticationService } from '../authentication.service';

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
            // eslint-disable-next-line @typescript-eslint/require-await
            sendMagicLink: async (destination: string, href: string) => {
                // TODO: send email or sms
                this.logger.info(
                    // `sending sms to ${phoneNumber} with Link ${config.client.loginUrl}${href}`,
                    `sending sms to ${destination} with Link ${href}`,
                );
            },
            // eslint-disable-next-line @typescript-eslint/require-await
            verify: async (
                payload: { destination: string },
                callback: (arg: null, user: Promise<UserAttributes | undefined>) => unknown,
            ) => {
                callback(null, this.validate(payload));
            },
        });
    }

    async validate(payload: { destination: string }) {
        const result = await this.authenticationService.validateUser({
            phone: payload.destination,
            email: payload.destination,
        });

        if (!result) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        return result;
    }
}
