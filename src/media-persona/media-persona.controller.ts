import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { KeycloakUser, RoleMatchingMode, Roles, User } from 'nestjs-keycloak-admin';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CreateMediaPersonaDto } from './dtos/create-media-persona.dto';
import { MediaPersonaService } from './media-persona.service';

@ApiBearerAuth()
@ApiTags('media-persona')
@Controller('media-persona')
export class MediaPersonaController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly mediaPersonaService: MediaPersonaService,
    ) {}

    @Get('/')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[],
    ) {
        try {
            return this.mediaPersonaService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(
                `MediaPersonaController - failed to get media personas, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Get('/:id')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    async findOne(@Param('id') mediaPersonaId: string) {
        try {
            return this.mediaPersonaService.find(mediaPersonaId);
        } catch (error) {
            this.logger.error(
                `MediaPersonaController - failed to get a media persona, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Post('/')
    async create(@User() user: KeycloakUser, @Body() createMediaPersonaDto: CreateMediaPersonaDto) {
        try {
            return this.mediaPersonaService.create(createMediaPersonaDto, user.email);
        } catch (error) {
            this.logger.error(
                `MediaPersonaController - failed to create a media persona, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }

    @Delete('/:id')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    async delete(@User() user: KeycloakUser, @Param('id') mediaPersonaId: string) {
        try {
            return this.mediaPersonaService.delete(mediaPersonaId, user.email);
        } catch (error) {
            this.logger.error(
                `MediaPersonaController - failed to delete media persona, ${
                    (error as Error).message
                }`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }
}
