import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// JwtAuthGuard é utilizado para proteger rotas que requerem autenticação JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} 
// AuthGuard('jwt') indica que esta guarda utiliza a estratégia 'jwt' definida no JwtStrategy
// O JwtStrategy deve ser implementado para validar o token JWT e extrair as informações do usuário