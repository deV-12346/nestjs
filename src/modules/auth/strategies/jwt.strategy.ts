import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        // console.log("Token received",req.cookies?.accessToken)
        const accessToken = req.cookies?.accessToken
        if(!accessToken) return null
        return accessToken
      },
      secretOrKey: process.env.ACCESS_TOKEN as string,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Helllo');
    return payload;
  }
}