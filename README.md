# 📓 Blog Pessoal com NestJS

Projeto desenvolvido durante o **Bloco 2** do **Bootcamp da Generation Brasil – Desenvolvedor Fullstack JavaScript.**  
O sistema possui autenticação, organização modular e versionamento de funcionalidades, seguindo boas práticas de código, testes e documentação.

---

## 🚀 Tecnologias Utilizadas

<p align="left">
  <img alt="NestJS" src="https://nestjs.com/img/logo-small.svg" width="40" height="40" style="margin-right:10px"/>
  <img alt="TypeScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" style="margin-right:10px"/>
  <img alt="Node.js" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40" style="margin-right:10px"/>
  <img alt="MySQL" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="40" height="40" style="margin-right:10px"/>
  <img alt="ESLint" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" width="40" height="40" style="margin-right:10px"/>
  <img alt="Jest" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="40" height="40" style="margin-right:10px"/>
</p>

---

## Diagrama das classes do projeto
 
  <img alt="Diagrama" src="https://camo.githubusercontent.com/c9f02ab37e969c86d9c938202535710e294b3f2da88c2a512347e07553e2d8f1/68747470733a2f2f692e696d6775722e636f6d2f4641756233616f2e6a7067" width="400"/>
</p>

 ---

## 🗂 Estrutura do Projeto

Organizado em módulos conforme domínios: Postagem, Tema, Usuário e Auth, respeitando a separação de responsabilidades para facilitar manutenção.

---

## ⚙️ Configuração do Ambiente

1. Copie o arquivo `.env_sample` e renomeie para `.env`:

2. Configure as variáveis no arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=db_blogpessoal
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor em modo desenvolvimento:
```bash
npm run start:dev
```

5. Rode os testes com Jest:
```bash
npm run test:e2e
```

🌐 Deploy
O projeto está hospedado no Render e possui documentação interativa via Swagger:
🔗 Acessar Swagger UI (LINK)

⚠️ Atenção: Para executar localmente, confirme que o app.module.ts está configurado para usar o DevService em vez do ProdService:
```ts
@Module({
  imports: [
    // ...
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: DevService, // linha deve estar ativa
      // useClass: ProdService, // deve estar comentada
    }),
    // ...
  ],
})
export class AppModule {}
```
