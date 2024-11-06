import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { UserAttributes } from '../user/models/user.model';
import { AuthenticationService } from './authentication.service';
import { AuthenticatedUser } from './decorators/authenticated-user.param-decorator';
import { Public } from './decorators/is-public.decorator';
import { PasswordLessLoginDto } from './dtos/password-less-login-magic-link.dto';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private strategy: MagicLoginStrategy,
    ) {}

    @Public()
    @Post('login')
    async login(
        @Req() req: Request,
        @Res() res: Response,
        @Body()
        body: PasswordLessLoginDto,
    ) {
        const validatedUser = await this.authenticationService.validateUser(body);

        if (!validatedUser) {
            throw new UnauthorizedException();
        }
        // assign the transformed value to the raw value
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        req.body.destination = body.email ?? body.phone ?? '';

        return this.strategy.send(req, res);
    }

    @Public()
    @UseGuards(AuthGuard('magiclogin'))
    @Get('login/callback')
    callback(@AuthenticatedUser() user: UserAttributes) {
        return this.authenticationService.generateTokens(user);
    }
}
