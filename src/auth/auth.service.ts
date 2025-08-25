import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Post } from '@nestjs/common'
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {

    constructor( 
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

async signup(email: string, pass: string){

    const existingUser = await this.userService.findOne(email);

    if(existingUser){
        throw new BadRequestException('Email already in use');
    }

    const hash = await bcrypt.hash(pass, 10);
    const user = await this.userService.create({email, hash});

    const token = await this.getTokens(user.id, user.email);
    return token;
}

async login(email: string, pass: string){
    const user = await this.userService.findOne(email);

    if(!user){
        throw new UnauthorizedException("invalid credentials");
    }

    const isMatch = await bcrypt.compare(pass, user.hash)

    if(isMatch){
        throw new UnauthorizedException('invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.email);
    return tokens;


}


private async getTokens(userId: number, email: string){
    const payload = { sub: userId, email};
    const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });

     const refreshTokenExpiresIn = this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN');
        console.log(`Debug: JWT_REFRESH_TOKEN_EXPIRES_IN is "${refreshTokenExpiresIn}"`);
        
    const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });

    return {accessToken, refreshToken};

}
   
// signin() {
//     return { msg: 'i have signed in'}
//    }
   
}




