import { ConfigModule } from '@config/config.module';
import keycloakconfig from '@config/keycloakconfig';
import ormconfig from '@config/ormconfig';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { TerminusModule } from '@nestjs/terminus';
import KeycloakModule, { AuthGuard, ResourceGuard } from 'nestjs-keycloak-admin';

import { AccessGroup } from '../specialty/models/specialty.model';
import { Category } from '../patient/models/category.model';
import { Difficulty } from '../difficulty/models/difficulty.model';
import { Highlight } from '../highlight/models/highlight.model';
import { Image } from '../image/models/image.model';
import { Media } from '../media/models/media.model';
import { MediaGroup } from '../media-group/models/media-group.model';
import { MediaOrderInGroup } from '../media-order-in-group/models/media-order-in-group.model';
import { MediaPersona } from '../media-persona/models/media-persona.model';
import { MediaTag } from '../media-tag/models/media-tag.model';
import { Pack } from '../pack/models/pack.model';
import { PackMediaGroup } from '../pack-media-group/models/pack-media-group.model';
import { Page } from '../page/models/page.model';
import { PageTag } from '../page-tag/models/page-tag.model';
import { PageType } from '../page-type/models/page-type.model';
import { Persona } from '../persona/models/persona.model';
import { Section } from '../section/models/section.model';
import { Sponsor } from '../sponsor/models/sponsor.model';
import { Tag } from '../tag/models/tag.model';
import { Thematic } from '../thematic/models/thematic.model';
import { User } from '../user/models/user.model';
import { UserPackAccessGroup } from '../user-pack-access-group/models/user-pack-access-group.model';
import { CustomExceptionFilter } from './custom-exception.filter';
import { ApplicationLoggerService } from './logger/application.logger.service';
import { RequestLoggerInterceptor } from './logger/request.logger.interceptor';
import { HealthController } from './monitoring/health/health.controller';
import { ResponseInterceptor } from './response.interceptor';
@Module({
    imports: [
        ConfigModule,
        SequelizeModule.forRoot({
            ...ormconfig,
            models: [
                AccessGroup,
                Category,
                Difficulty,
                Highlight,
                Image,
                Media,
                MediaGroup,
                MediaOrderInGroup,
                MediaPersona,
                MediaTag,
                Pack,
                PackMediaGroup,
                Page,
                PageTag,
                PageType,
                Persona,
                Section,
                Sponsor,
                Tag,
                Thematic,
                User,
                UserPackAccessGroup,
            ],
        }),
        TerminusModule,
        KeycloakModule.register({
            baseUrl: keycloakconfig.authServerUrl,
            realmName: keycloakconfig.realm,
            clientSecret: keycloakconfig.secret,
            clientId: keycloakconfig.clientId,
        }),
    ],
    exports: [ConfigModule, ApplicationLoggerService, KeycloakModule],
    providers: [
        ApplicationLoggerService,
        {
            provide: APP_INTERCEPTOR,
            // XXX this is used specifically to override it during the test
            useClass: RequestLoggerInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: CustomExceptionFilter,
        },

        { useClass: ResourceGuard, provide: APP_GUARD },
        { useClass: AuthGuard, provide: APP_GUARD },
    ],
    controllers: [HealthController],
})
export class CoreModule {}
