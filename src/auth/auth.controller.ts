import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express'
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
}
