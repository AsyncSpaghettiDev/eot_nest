import { Controller, Get, Post, Session, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common'
import { Body, Param } from '@nestjs/common/decorators'
import { hashPassword } from 'utils/bcrypt'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './utils/LocalGuard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Session() session: Record<string, any>) {
        session.authenticated = true
        console.log(session.id)
        return { ...session, token: session.id }
    }

    @Get('encrypt')
    async encrypt(@Query('password') password: string) {
        if (!password) throw new HttpException('Password is required', HttpStatus.BAD_REQUEST)
        return hashPassword(password)
    }

    @Get(':session_id')
    async getSession(@Param('session_id') session_id: string) {
        return this.authService.getSession(session_id)
    }

    @Post('logout')
    async logout(
        @Session() session: Record<string, any>,
        @Body('token') session_id: string
    ) {
        session.authenticated = false
        session.destroy()
        this.authService.deleteSession(session_id || session.id)
        return session
    }
}
