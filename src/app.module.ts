import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'bloguser',
      password: 'blog123',
      database: 'blogpessoal', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      synchronize: true,
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}