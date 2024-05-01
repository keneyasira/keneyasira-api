import { Module } from '@nestjs/common';

import { AccessGroupModule } from './specialty/specialty.module';
import { CategoryModule } from './patient/patient.module';
import { CoreModule } from './core/core.module';
import { RootController } from './core/root.controller';
import { DifficultyModule } from './difficulty/difficulty.module';
import { HighlightModule } from './highlight/highlight.module';
import { ImageModule } from './image/image.module';
import { MediaModule } from './media/media.module';
import { MediaGroupModule } from './media-group/media-group.module';
import { MediaOrderInGroupModule } from './media-order-in-group/media-order-in-group.module';
import { MediaPersonaModule } from './media-persona/media-persona.module';
import { MediaTagModule } from './media-tag/media-tag.module';
import { PackModule } from './pack/pack.module';
import { PackMediaGroupModule } from './pack-media-group/pack-media-group.module';
import { PageTypeModule } from './page-type/page-type.module';
import { PersonaModule } from './persona/persona.module';
import { RoleModule } from './role/role.module';
import { SectionModule } from './section/section.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { ThematicModule } from './thematic/thematic.module';
import { UserModule } from './user/user.module';
import { UserPackAccessGroupModule } from './user-pack-access-group/user-pack-access-group.module';
import { UserRoleModule } from './user-role/user-role.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
    imports: [
        AccessGroupModule,
        CategoryModule,
        CoreModule,
        DifficultyModule,
        HighlightModule,
        ImageModule,
        MediaGroupModule,
        MediaModule,
        MediaOrderInGroupModule,
        MediaPersonaModule,
        MediaTagModule,
        PackModule,
        PackMediaGroupModule,
        PageTypeModule,
        PersonaModule,
        RoleModule,
        SectionModule,
        SponsorModule,
        UserModule,
        UserPackAccessGroupModule,
        UserRoleModule,
        ThematicModule,
        WebhookModule,
    ],
    controllers: [RootController],
})
export class AppModule {}
