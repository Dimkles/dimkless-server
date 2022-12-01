import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express'
@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {

        return this.authService.login(userDto, response)
    }
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.registration(userDto, response)
    }

    @Post('/refresh')
    refresh(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
        return this.authService.refresh(response, request)
    }
}
