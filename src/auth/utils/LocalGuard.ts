import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { User } from "entities"
import { Request } from "express"

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const result = (await super.canActivate(context)) as boolean
        await super.logIn(request)
        return result
    }
}

export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        return request.isAuthenticated()
    }
}

export class AdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        if (!request.isAuthenticated()) return false
        const { role } = request?.user as User
        return request.isAuthenticated() && role.name === 'admin'
    }
}

export class StaffGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        if (!request.isAuthenticated()) return false
        const { role } = request?.user as User
        return request.isAuthenticated() && role.isStaff
    }
}