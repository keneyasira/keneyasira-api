import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Admin } from '../admin/models/admin.model';
import { Collaborator } from '../collaborator/models/collaborator.model';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Patient } from '../patient/models/patient.model';
import { Practician } from '../practician/models/practician.model';
import { ROLE_NAMES } from '../role/role.service';
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

        const roles = await this.userRoleService.getUserRoles(user.id);
        const infos: Record<string, unknown> = {};

        // Add specific IDs based on roles
        const roleModels = {
            [ROLE_NAMES.ADMIN]: Admin,
            [ROLE_NAMES.PATIENT]: Patient,
            [ROLE_NAMES.PRACTICIAN]: Practician,
            [ROLE_NAMES.COLLABORATOR]: Collaborator,
        };

        for (const role in roleModels) {
            if (roles.includes(role)) {
                const info = await roleModels[role as keyof typeof roleModels].findOne({
                    attributes: ['id'],
                    where: { userId: user.id },
                });

                if (info) {
                    infos[role] = info.get({ plain: true });
                }
            }
        }

        const payload = {
            sub: user.id,
            roles,
            infos,
            ...user,
        };

        return { data: { access_token: this.jwtService.sign(payload) } };
    }
}
