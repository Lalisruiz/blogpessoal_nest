// Importa os módulos necessários do NestJS
import { ValidationPipe } from '@nestjs/common';  // Pipe para validação automática
import { NestFactory } from '@nestjs/core';      // Classe para criar a aplicação NestJS
import { AppModule } from './app.module';        // Módulo principal da aplicação

// Função principal que inicializa a aplicação
async function bootstrap() {
    // Cria uma instância da aplicação NestJS
    const app = await NestFactory.create(AppModule);

    // Configura o fuso horário para -03:00 (Horário de Brasília)
    // process.env.TZ já foi configurado no topo do arquivo

    // Habilita validação automática global para todos os endpoints
    // Isso valida automaticamente os DTOs (Data Transfer Objects)
    app.useGlobalPipes(new ValidationPipe());
    
    // Habilita CORS (Cross-Origin Resource Sharing)
    // Permite que a API seja acessada de diferentes domínios/origens
    app.enableCors();
    await app.listen(process.env.PORT ?? 4000);
}

// Chama a função bootstrap para iniciar a aplicação
bootstrap();