import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req) => req.cookies.refresh_token,
      secretOrKey: process.env.REFRESH_TOKEN as string,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}