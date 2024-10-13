// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import type { UserAttributes } from '../../user/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticationService: AuthenticationService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret', // TODO get from config module
        });
    }

    async validate(payload: UserAttributes) {
        const result = await this.authenticationService.validateUser(payload.phone);
        if (!result) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        return result;
    }
}
