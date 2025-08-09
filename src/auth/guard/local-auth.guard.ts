import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// LocalAuthGuard é utilizado para proteger rotas que requerem autenticação local
// AuthGuard('local') indica que esta guarda utiliza a estratégia 'local' definida no LocalStrategy
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}