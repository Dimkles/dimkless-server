import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { Response } from 'express'

@Injectable()
export class AuthService {


    constructor(private usersService: UsersService,
        private jwtService: JwtService) { }

    async login(userDto: CreateUserDto, response: Response) {
        const user = await this.validateUser(userDto)
        const token = await this.generateToken(user)
        response.cookie('refreshToken', token.refreshToken)
        return token
    }

    async registration(userDto: CreateUserDto, response: Response) {
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
        const token = await this.generateToken(user)
        response.cookie('refreshToken', token.refreshToken)
        return token
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        const token = {
            refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
            accessToken: this.jwtService.sign(payload, { expiresIn: '15m' })
        }
        return token
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email)
        if (!user) throw new UnauthorizedException({ message: 'Некорректый email или пароль' })
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Некорректый email или пароль' })
    }

}
