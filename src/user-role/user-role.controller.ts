import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { KeycloakUser, RoleMatchingMode, Roles, User } from 'nestjs-keycloak-admin';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { DeleteUserRoleDto } from './dtos/delete-user-role.dto';
import { UserRoleService } from './user-role.service';

@ApiBearerAuth()
@ApiTags('user-role')
@Controller('user-role')
export class UserRoleController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly userRoleService: UserRoleService,
    ) {}

    @Get('/:id')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    async findOne(@Param('id') userId: string) {
        return this.userRoleService.find(userId);
    }

    @Post('/')
    async create(@User() user: KeycloakUser, @Body() createUserRoleDto: CreateUserRoleDto) {
        return this.userRoleService.create(createUserRoleDto, user.email);
    }

    @Delete('/:id')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    async delete(@User() user: KeycloakUser, @Body() deleteUserRoleDto: DeleteUserRoleDto) {
        return this.userRoleService.delete(deleteUserRoleDto, user.email);
    }
}
