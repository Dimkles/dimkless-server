import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express'
import { JwtAuthGuard } from './jwt-auth.guard';
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {

        return this.authService.login(userDto, response)
    }
    @UseGuards(JwtAuthGuard)
    @Get('/logout')
    logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        return this.authService.logout(response, request)
    }
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.registration(userDto, response)
    }
    @Get('/refresh')
    refresh(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
        return this.authService.refresh(response, request)
    }
}
