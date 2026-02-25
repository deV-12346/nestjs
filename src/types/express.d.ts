import * as express from 'express';
import { JwtPayload } from '../modules/auth/types/jwt-payload';

declare module 'express' {
  interface Request {
    user: JwtPayload;
  }
}
