import { Controller, Get, Post, Session, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './utils/LocalGuard'

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Session() session: Record<string, any>) {
        session.authenticated = true
        return session
    }

    @Get()
    async getSession(@Session() session: Record<string, any>) {
        console.log(session.authenticated)
        return session
    }

    @Post('logout')
    async logout(@Session() session: Record<string, any>) {
        session.authenticated = false
        session.destroy()
        return session
    }
}
