import { IsNotEmpty } from "class-validator"

export class UsuarioLogin {

    @IsNotEmpty()
    public usuario: string

    @IsNotEmpty()
    public senha: string

}