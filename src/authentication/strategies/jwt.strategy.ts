// jwt.strategy.ts
import { Config } from '@config/default';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserAttributes } from '../../user/models/user.model';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authenticationService: AuthenticationService,
        config: Config,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwt_secret,
        });
    }

    async validate(payload: UserAttributes) {
        const result = await this.authenticationService.validateUser({
            phone: payload.phone,
            email: payload.email,
        });

        if (!result) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        return result;
    }
}
