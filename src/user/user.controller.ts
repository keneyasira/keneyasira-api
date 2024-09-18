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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { SortParams } from '../typings/query.typings';
import { errorToPlainObject } from '../utils/error.helper';
import { ParseLimitParamPipe } from '../utils/pipes/parseLimitParamPipe';
import { DEFAULT_SORT_PARAMS, ParseSortPipe } from '../utils/pipes/parseSortParamPipe';
// import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private readonly userService: UserService,
    ) {}

    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(0), ParseIntPipe, ParseLimitParamPipe) limit: number,
        @Query('sort', new ParseSortPipe()) sort: SortParams[] = DEFAULT_SORT_PARAMS,
    ) {
        try {
            return this.userService.findAndCountAll({ page, limit, sort });
        } catch (error) {
            this.logger.error(`UserController - failed to get users, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    @Get('/:id')
    async findOne(@Param('id') userId: string) {
        try {
            const user = await this.userService.find(userId);

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {
            this.logger.error(`UserController - failed to get user, ${(error as Error).message}`, {
                error: errorToPlainObject(error as Error),
            });
            throw error;
        }
    }

    // @Post('/')
    // async create(@Body() createUserDto: CreateUserDto) {
    //     try {
    //         return this.userService.create(createUserDto);
    //     } catch (error) {
    //         this.logger.error(
    //             `UserController - failed to create user, ${(error as Error).message}`,
    //             {
    //                 error: errorToPlainObject(error as Error),
    //             },
    //         );

    //         throw error;
    //     }
    // }

    // @Put('/:id')
    // async update(
    //     @Body() updateUserDto: UpdateUserDto,
    //     @Param('id') userId: string,
    // ) {
    //     if (userId !== updateUserDto.id) {
    //         throw new BadRequestException('Mismatching identifiers');
    //     }

    //     try {
    //         return this.userService.update(updateUserDto);
    //     } catch (error) {
    //         this.logger.error(
    //             `UserController - failed to update user, ${(error as Error).message}`,
    //             {
    //                 error: errorToPlainObject(error as Error),
    //             },
    //         );

    //         throw error;
    //     }
    // }

    @Delete('/:id')
    async delete(@Param('id') userId: string) {
        try {
            await this.userService.delete(userId);
        } catch (error) {
            this.logger.error(
                `UserController - failed to delete user, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );

            throw error;
        }
    }
}
