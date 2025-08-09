import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
//Cria os atributos privados, os atributos são username e password, que serão utilizados para autenticação.
    private _usernameField: string;
    private _passwordField: string;
// injeta um Objeto dessa Classe no Construtor da LocalStrategy.
    constructor(private readonly authService: AuthService) {
        super(); 
        this._usernameField = 'usuario';
        this._passwordField = 'senha';
    }
// Valida os campos que serão utilizados para autenticação.
    async validate(usuario: string, senha: string): Promise<any> {
        const validaUsuario = await this.authService.validateUser(usuario, senha);
        if (!validaUsuario) {
            throw new UnauthorizedException("Usuário e/ou senha incorretos!");
        }
        return validaUsuario;
    }

}
