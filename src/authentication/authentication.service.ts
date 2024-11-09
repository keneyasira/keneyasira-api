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

    async validateUser(dto: PasswordLessLoginDto) {
        const result = await this.userService.findByEmailOrNumber(dto);

        if (!result) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        // const roles = await this.userRoleService.getUserRoles(result.data.id);

        // if (roles?.filter((role) => role && role === dto.clientType).length === 0) {
        //     throw new UnauthorizedException('Invalid Credential roles');
        // }

        return result;
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
