import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './is_public.decorator';
import { UsersService } from 'src/users/users.service';
import { PrismaClientKnownRequestError } from '../../src/generated/client/runtime/library';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() user: { username: string, password: string, name: string }) {
        return this.usersService.user.create({ data: { username: user.username, password: user.password, name: user.name } }).then(user => {
            const { password, ...rest } = user;
            return rest
        }).catch(err => {
            if (err instanceof PrismaClientKnownRequestError && err.meta.target === "User_username_key") {
                throw new UnprocessableEntityException('User already exists')
            }
            throw new UnprocessableEntityException()
        })
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
