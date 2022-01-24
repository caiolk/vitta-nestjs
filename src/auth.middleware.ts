import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: () => void){
        const authHeader = req.header('authorization');

        if (!authHeader) {
        throw new HttpException('Acesso negado.', HttpStatus.UNAUTHORIZED);
        }

        const bearerToken: string[] = authHeader.split(' ');
        const token: string = bearerToken[1];

        res.locals.token  = token;

        next();  
    }
}