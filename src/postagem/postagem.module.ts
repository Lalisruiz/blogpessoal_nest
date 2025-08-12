import { Module } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controllers/postagem.controller";
import { PostagemService } from "./services/postagem.service";
import { TemaModule } from "../tema/tema.module";
import { DeleteResult, Like, Repository } from "typeorm";

// Module/Entidade tem a função de agrupar e mapear os componentes.
@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
  controllers: [PostagemController],
  providers: [PostagemService],
  exports: [TypeOrmModule],
})
export class PostagemModule {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.postagemRepository.delete(id);
  }

  async findById(id: number): Promise<Postagem> {
    return await this.postagemRepository.findOne({
      where: { id },
      relations: { tema: true, usuario: true },
    });
  }

  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: { titulo: Like(`%${titulo}%`) },
      relations: { tema: true, usuario: true },
    });
  }
}
