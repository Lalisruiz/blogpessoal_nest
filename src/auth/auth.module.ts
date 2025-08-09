import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { Bcrypt } from './bcrypt/bcrypt';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, Bcrypt],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}