import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("Testes dos Módulos Usuario e Auth (e2e)", () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("01 - Não Deve Cadastrar um novo Usuário se a senha for menor que 8 caracteres e se não tiver pelo menos um especial",
    async () => {
    const resposta = await request(app.getHttpServer())
      .post("/usuarios/cadastro")
      .send({
        nome: "Root",
        usuario: "root@root.com",
        senha: "rootroot@",
        foto: "-",
      })
      .expect(400);

    usuarioId = resposta.body.id;
  });

  it("02 - Não Deve Cadastrar um novo Usuário sem um e-mail valido", async () => {
    const resposta = await request(app.getHttpServer())
      .post("/usuarios/cadastro")
      .send({
        nome: "Root",
        usuario: "root",
        senha: "rootroot",
        foto: "-",
      })
      .expect(400);

    usuarioId = resposta.body.id;
  });

  it("03 - Deve Cadastrar um novo Usuário", async () => {
    const resposta = await request(app.getHttpServer())
      .post("/usuarios/cadastro")
      .send({
        nome: "Root",
        usuario: "root@root.com",
        senha: "rootroot",
        foto: "-",
      })
      .expect(201);

    usuarioId = resposta.body.id;
  });

  it("04 - Não Deve Cadastrar um Usuário Duplicado", async () => {
    await request(app.getHttpServer())
      .post("/usuarios/cadastro")
      .send({
        nome: "Root",
        usuario: "root@root.com",
        senha: "rootroot",
        foto: "-",
      })
      .expect(400);
  });

  it("05 - Não Deve Autenticar o Usuário (Login) Se a Senha Estiver Errada", async () => {
    const resposta = await request(app.getHttpServer())
      .post("/usuarios/login")
      .send({
        usuario: "root@root.com",
        senha: "rootroot2",
      })
      .expect(401);

    token = resposta.body.token;
  });

  it("06 - Deve Autenticar o Usuário (Login)", async () => {
    const resposta = await request(app.getHttpServer())
      .post("/usuarios/login")
      .send({
        usuario: "root@root.com",
        senha: "rootroot",
      })
      .expect(200);

    token = resposta.body.token;
  });

  it("07 - Não Deve Listar Todos os Usuários Sem Estar Logado", async () => {
    return request(app.getHttpServer())
      .get("/usuarios/all")
      .send({})
      .expect(401);
  });

  it("08 - Não Deve Atualizar um Usuário Sem Estar Logado", async () => {
    return request(app.getHttpServer())
      .put("/usuarios/atualizacao")
      .send({
        id: usuarioId,
        nome: "Root Atualizado",
        usuario: "root@root.com",
        senha: "rootroot",
        foto: "-",
      })
      .expect(401)
      .then(() => {
        expect('undefined');
      });
  });

  it("09 - Deve Listar Todos os Usuários", async () => {
    return request(app.getHttpServer())
      .get("/usuarios/all")
      .set("Authorization", `${token}`)
      .send({})
      .expect(200);
  });

  it("10 - Deve Atualizar um Usuário", async () => {
    return request(app.getHttpServer())
      .put("/usuarios/atualizacao")
      .set("Authorization", `${token}`)
      .send({
        id: usuarioId,
        nome: "Root Atualizado",
        usuario: "root@root.com",
        senha: "rootroot",
        foto: "-",
      })
      .expect(200)
      .then((resposta) => {
        expect("Root Atualizado").toEqual(resposta.body.nome);
      });
  });
});
