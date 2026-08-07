import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/DTO/user.dto';
import { LoginDto } from '../users/DTO/login.dto';
import { UserEntity } from '../users/Entity/user.entity';
import * as bcrypt from 'bcrypt';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    
    ) { }

    public async register(data: UserDto) {
        const isUser = await this.userService.findByEmail(data.email);
        console.log('User exists:', isUser ? 'Yes':'No')
        if (isUser) {
            throw new ErrorHandler('User already exists', HttpStatus.CONFLICT); // 409
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userService.registerUser({
            ...data, password: hashedPassword,
        });
        console.log("User saved in database:", user);
        const token = await this.jwtService.signAsync({ id: user.id });
        console.log("JWT payload:", { id: user.id });
        return { user, token };
    }

    public async login(data: LoginDto) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) {
            throw new ErrorHandler('User not found', HttpStatus.NOT_FOUND);
        }
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new ErrorHandler('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const token = await this.jwtService.signAsync({ id: user.id });
        return { user, token };
    }

    public async authUserId(request: Request): Promise<number> {
        const jwt = request.cookies?.jwt;
        if (!jwt) {
            throw new ErrorHandler('You are unauthorized', HttpStatus.UNAUTHORIZED);
        }
        try {
            const { id } = await this.jwtService.verifyAsync(jwt);
            return id;
        } catch (err) {
            throw new ErrorHandler('Invalid or expired token', HttpStatus.UNAUTHORIZED);
        }
    }

    public async getUserById(id: number): Promise<UserEntity> {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new ErrorHandler('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }
}