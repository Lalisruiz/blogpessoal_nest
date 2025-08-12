// Módulos fundamentais do framework NestJS para configuração
import { ValidationPipe } from '@nestjs/common';  // Sistema de validação de dados
import { NestFactory } from '@nestjs/core';      // Factory para criação de aplicações
import { AppModule } from '../src/app.module';

// Função de inicialização e configuração da aplicação
async function bootstrap() {
    // Instancia a aplicação NestJS usando o módulo principal    .post("/usuarios/logar")  // ❌ DEVERIA SER: "/auth/logar"
    const app = await NestFactory.create(AppModule);

    // Define timezone padrão como horário de Brasília (UTC-3)
    // process.env.TZ configurado anteriormente no arquivo

    // Ativa sistema de validação global para todas as rotas
    // Valida automaticamente objetos de transferência de dados (DTOs)
    app.useGlobalPipes(new ValidationPipe());
    
    // Configura CORS (Compartilhamento de Recursos entre Origens)
    // Autoriza acesso à API de diferentes domínios/origens
    app.enableCors();
    await app.listen(process.env.PORT ?? 4000);
}

// Executa a função de inicialização para começar a aplicação
bootstrap();