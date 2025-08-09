import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService, // injeta o UsuarioService para acessar os métodos de usuário
        private jwtService: JwtService, //implementa o JWT para autenticação
        private bcrypt: Bcrypt // implementa o Bcrypt para criptografia de senhas
    ){ }

    async validateUser(username: string, password: string): Promise<any>{ // Valida o usuário

        const buscaUsuario = await this.usuarioService.findByUsuario(username) // Busca o usuário pelo nome de usuário

        // Se o usuário não for encontrado, lança uma exceção de usuário não encontrado

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)
        // Compara a senha fornecida com a senha armazenada no banco de dados
        if(buscaUsuario && matchPassword){
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        return null // Retorna null se a senha não corresponder ou o usuário não for encontrado

    }
    
    async login(usuarioLogin: UsuarioLogin){

        const payload = { sub: usuarioLogin.usuario } // Cria o payload do token com o nome de usuário

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario) // Busca o usuário pelo nome de usuário

        // Adiciona verificação de nulidade
        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND) 
        // Retorna o usuário com o token JWT assinado
        return{
            id: buscaUsuario.id, // ID do usuário
            nome: buscaUsuario.nome, // Nome do usuário
            usuario: usuarioLogin.usuario, // Nome de usuário
            senha: '', // Senha não deve ser retornada
            foto: buscaUsuario.foto, // Foto do usuário
            token: `Bearer ${this.jwtService.sign(payload)}`, // Token JWT
        }

    }
}