import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemModule } from "./postagem/postagem.module";
import { TemaModule } from "./tema/tema.module";
import { AuthModule } from "./auth/auth.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { DevService } from "./data/services/dev.services";
import { ProdService } from "./data/services/prod.services";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //useClass: DevService,
      useClass: ProdService,
    }),
    AuthModule,
    UsuarioModule,
    TemaModule,
    PostagemModule,
  ],
  controllers: [AppController],
})
export class AppModule {}