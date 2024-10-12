import { Controller, Post, Req, Res, Body, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type MagicLoginStrategy from 'passport-magic-login';
import type { AuthenticationService } from './authentication.service';
import type { PasswordLessLoginDto } from './dtos/password-less-login.dto';
import { Request, Response } from 'express';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private strategy: MagicLoginStrategy,
    ) {}

    @Post('login')
    login(
        @Req() req: Request,
        @Res() res: Response,
        @Body(new ValidationPipe()) body: PasswordLessLoginDto,
    ) {
        this.authenticationService.validateUser(body.phoneNumber);

        return this.strategy.send(req, res);
    }

    // @UseGuards(AuthenticationGuard('magiclogin'))
    @Get('login/callback')
    callback(@Req() req: Request) {
        // return req.user;
        return this.authenticationService.generateTokens(req.user);
    }
}
