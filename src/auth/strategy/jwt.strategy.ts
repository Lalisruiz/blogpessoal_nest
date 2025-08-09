import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){ 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Não ignora a expiração do token
            secretOrKey: jwtConstants.secret, // A chave secreta usada para assinar os tokens JWT
        });
    }

    async validate(payload: any){
        return payload;
    }
}