import {
    Controller,
    Post,
    Req,
    Res,
    Body,
    ValidationPipe,
    UseGuards,
    Get,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { PasswordLessLoginDto } from './dtos/password-less-login.dto';
import { Request, Response } from 'express';
import { MagicLoginStrategy } from './strategies/magic-login.strategy';
import { AuthGuard } from '@nestjs/passport';
import type { UserAttributes } from '../user/models/user.model';
import { Public } from './decorators/is-public.decorator';

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
        @Body(
            new ValidationPipe({
                transform: true,
                transformOptions: { enableImplicitConversion: true },
            }),
        )
        body: PasswordLessLoginDto,
    ) {
        const result = await this.authenticationService.validateUser(body.destination);
        if (!result) {
            throw new UnauthorizedException();
        }
        // assign the transformed value to the raw value
        req.body.destination = body.destination;
        return await this.strategy.send(req, res);
    }

    @UseGuards(AuthGuard('magiclogin'))
    @Get('login/callback')
    async callback(@Req() req: Request) {
        console.log(req)
        return await this.authenticationService.generateTokens(req.user as UserAttributes);
    }
}
