import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Tema } from "../../tema/entities/tema.entity";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.config.get<string>("DB_HOST"),
      port: this.config.get<number>("DB_PORT"),
      username: this.config.get<string>("DB_USERNAME"),
      password: this.config.get<string>("DB_PASSWORD"),
      database: this.config.get<string>("DB_NAME"),
      entities: [Usuario, Postagem, Tema],
      synchronize: true,
      logging: true,
    };
  }
}

export class DevDateService {
  getCurrentDate(): Date {
    return new Date();
  }
}