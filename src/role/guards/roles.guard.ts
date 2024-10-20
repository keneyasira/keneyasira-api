import { CanActivate, ExecutionContext, ForbiddenException,Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// Define the Roles Guard
@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // First, run the normal JWT authentication
        const canActivate = super.canActivate(context);

        if (!canActivate) {
            return false;
        }

        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            // If no roles are required for the route, allow access
            return true;
        }

        // After JWT AuthGuard passes, check if the user has the required role
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const request = context.switchToHttp().getRequest();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const user = request.user;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        if (!user || !user.roles || !this.hasRequiredRole(user.roles, roles)) {
            throw new ForbiddenException(
                'You do not have permission (roles) to access this resource.',
            );
        }

        return true;
    }

    // Helper method to check if user has at least one of the required roles
    private hasRequiredRole(userRoles: string[], requiredRoles: string[]): boolean {
        return requiredRoles.some((role) => userRoles.includes(role));
    }
}
