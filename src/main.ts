import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  // Cria uma nova instância da aplicação NestJS através do factory
  const app = await NestFactory.create(AppModule);
  // DocumentBuilder é uma classe que ajuda a construir a documentação da API
  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact('Larissa Ruiz', 'github.com/lalisruiz', 'rrs.larissa@gmail.com') // O método setContact espera 3 argumentos: nome, url e email
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
    const document = SwaggerModule.createDocument(app, config);
    // Swagger é uma ferramenta que gera automaticamente uma documentação interativa para a API REST.
    // No NestJS, usando o pacote @nestjs/swagger, você pode acessar a documentação em /swagger.
    // Isso facilita visualizar, testar e entender todos os endpoints da aplicação.
    SwaggerModule.setup('/swagger', app, document);

  // Define o timezone brasileiro (GMT-3) para toda a aplicação
  process.env.TZ = process.env.TZ || "-03:00";

  // Aplica validação automática em todos os endpoints da aplicação
  app.useGlobalPipes(new ValidationPipe());

  // Permite requisições de qualquer origem (Cross-Origin Resource Sharing)
  app.enableCors();

  // Inicia o servidor na porta definida no .env ou 4000
  await app.listen(process.env.PORT || 4000);
}

// Executa a função de inicialização da aplicação
bootstrap();
