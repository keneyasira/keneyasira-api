import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, type UserAttributes } from '../user/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private jwtService: JwtService,
    ) {}

    async validateUser(phoneNumber: string) {
        const user = await User.findOne({
            where: {
                phone: phoneNumber,
            },
        });

        if (!user) {
            return;
        }

        return user.get({ plain: true });
    }

    generateTokens(user: UserAttributes | undefined) {
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        this.logger.debug(` generating tokens`, user);
        // TODO: create jwt
        const payload = {
            sub: user.id,
            ...user,
        };

        return { access_token: this.jwtService.sign(payload) };
    }
}
