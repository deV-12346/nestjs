import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwt-payload";

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log("request......")
        console.log(req.cookies?.refreshToken)
        return req?.cookies?.refreshToken
      },
      secretOrKey: process.env.REFRESH_TOKEN as string,
    });
  } 
  async validate(payload: JwtPayload) {
    console.log('Helllo');
    return payload
  }
}