import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { UserAttributes } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { UserRoleService } from '../user-role/user-role.service';
import { PasswordLessLoginDto } from './dtos/password-less-login-magic-link.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly userService: UserService,
        private readonly userRoleService: UserRoleService,
        private jwtService: JwtService,
    ) {}

    validateUser(dto: PasswordLessLoginDto) {
        return this.userService.findByEmailOrNumber(dto);
    }

    async generateTokens(user: UserAttributes | undefined) {
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload = {
            sub: user.id,
            roles: await this.userRoleService.getUserRoles(user.id),
            ...user,
        };

        return { data: { access_token: this.jwtService.sign(payload) } };
    }
}
