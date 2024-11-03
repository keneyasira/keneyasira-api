import {
    BadRequestException,
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticatedUser } from '../authentication/decorators/authenticated-user.param-decorator';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SearchParams, SortParams } from '../typings/query.typings';
import { UserAttributes } from '../user/models/user.model';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dtos/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dtos/update-collaborator.dto';

@ApiBearerAuth()
@ApiTags('collaborator')
@Controller('collaborators')
export class CollaboratorController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly collaboratorService: CollaboratorService,
    ) {}

    @Get('/')
    @ApiQuery({
        name: 'sort',
        required: false,
        type: String,
        example: `[{field: 'createdAt', order: 'DESC'}]`,
    })
    @ApiQuery({ name: 'firstName', required: false, type: String })
    @ApiQuery({ name: 'lastName', required: false, type: String })
    @ApiQuery({ name: 'email', required: false, type: String })
    @ApiQuery({ name: 'phone', required: false, type: String })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
        @Query('firstName') firstName?: string,
        @Query('lastName') lastName?: string,
        @Query('email') email?: string,
        @Query('phone') phone?: string,
    ) {
        try {
            const search: SearchParams = {
                firstName,
                lastName,
                email,
                phone,
            };

            return this.collaboratorService.findAndCountAll({ page, limit, sort, search });
        } catch (error) {
            this.logger.error(`CollaboratorController - failed to get collaborators, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') collaboratorId: string) {
        try {
            const collaborator = await this.collaboratorService.find(collaboratorId);

            if (!collaborator) {
                throw new NotFoundException('Collaborator not found');
            }

            return collaborator;
        } catch (error) {
            this.logger.error(`CollaboratorController - failed to get collaborator, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    @Post('/')
    async create(@AuthenticatedUser() user: UserAttributes, @Body() createCollaboratorDto: CreateCollaboratorDto) {
        try {
            return this.collaboratorService.create({ ...createCollaboratorDto, createdBy: user.id });
        } catch (error) {
            this.logger.error(
                `CollaboratorController - failed to create collaborator, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Put('/:id')
    async update(
        @AuthenticatedUser() user: UserAttributes,
        @Body() updateCollaboratorDto: UpdateCollaboratorDto,
        @Param('id') collaboratorId: string,
    ) {
        if (collaboratorId !== updateCollaboratorDto.id) {
            throw new BadRequestException('Mismatching identifiers');
        }

        try {
            return this.collaboratorService.update({ ...updateCollaboratorDto, updatedBy: user.id });
        } catch (error) {
            this.logger.error(
                `CollaboratorController - failed to update collaborator, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    @Delete('/:id')
    async delete(@AuthenticatedUser() user: UserAttributes, @Param('id') collaboratorId: string) {
        try {
            await this.collaboratorService.delete({ collaboratorId, deletedBy: user.id });
        } catch (error) {
            this.logger.error(
                `CollaboratorController - failed to delete collaborator, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }
}