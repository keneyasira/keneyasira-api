import { Config } from '@config/default';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request, Response } from 'express';
import Strategy from 'passport-magic-login';

import { ApplicationLoggerService } from '../../core/logger/application.logger.service';
import { UserAttributes } from '../../user/models/user.model';
import { AuthenticationService } from '../authentication.service';

export const ClientTypes = {
    ADMIN: 'admin',
    PATIENT: 'patient',
    PRACTICIAN: 'practician',
    COLLABORATOR: 'collaborator',
} as const;

export type ClientType = (typeof ClientTypes)[keyof typeof ClientTypes];
@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
    clientType: ClientType;
    constructor(
        private authenticationService: AuthenticationService,
        private readonly logger: ApplicationLoggerService,
        private readonly config: Config,
    ) {
        super({
            secret: config.jwt_secret, // get this from env vars
            jwtOptions: {
                expiresIn: '5m',
            },
            // callbackUrl: 'http://localhost:4000/authentication/login/callback',
            callbackUrl: `${config.clients.patientUrl}/auth/callback`,
            // eslint-disable-next-line @typescript-eslint/require-await
            sendMagicLink: async (destination: string, href: string) => {
                const clientType = this.clientType;

                const clientUrls = {
                    [ClientTypes.ADMIN]: this.config.clients.adminUrl,
                    [ClientTypes.PATIENT]: this.config.clients.patientUrl,
                    [ClientTypes.PRACTICIAN]: this.config.clients.practicianUrl,
                    [ClientTypes.COLLABORATOR]: this.config.clients.collaboratorUrl,
                };


                const baseUrl = clientUrls[clientType];
                const callbackUrl = `${baseUrl}/auth/callback`;

                // Replace the default callback URL with the client-specific one
                const clientHref = href.replace(this.config.clients.patientUrl, baseUrl);

                // TODO: send email or sms
                this.logger.info(
                    `sending sms to ${destination} with Link ${clientHref} for client ${clientType} (callback: ${callbackUrl})`,
                );
            },
            // eslint-disable-next-line @typescript-eslint/require-await
            verify: async (
                payload: { destination: string; clientType: ClientType },
                callback: (arg: null, user: Promise<UserAttributes | undefined>) => unknown,
            ) => {
                callback(null, this.validate(payload));
            },
        });

        //override send method
        const oldSend = this.send;

        this.send = (req: Request, res: Response) => {
            // Store the client type for use in sendMagicLink
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            this.clientType = req.body.clientType;

            return oldSend(req, res);
        };
    }

    async validate(payload: { destination: string; clientType: ClientType }) {
        const result = await this.authenticationService.validateUser({
            phone: payload.destination,
            email: payload.destination,
            clientType: payload.clientType,
        });

        if (!result) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        return result.data;
    }
}
