import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsuarioLogin } from './entities/usuariologin.entity';

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('/logar')
  async login(@Body() usuarioLogin: UsuarioLogin): Promise<any> {
    return this.authService.login(usuarioLogin);
  }
}