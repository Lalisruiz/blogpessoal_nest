import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/services/tema.service";
import { DevDateService } from "../../date/services/dev.services";
import { ProdDateService } from "../../date/services/prod.services";

// Contém todos os métodos de postagem.
// Service acessa a repository que acessa o banco. (Conversa com o banco de dados através da Repository)
// Principal característica dos services são suas regras.

@Injectable()
export class PostagemService {
  private dateService: DevDateService | ProdDateService;

  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService,
  ) {
    if (process.env.NODE_ENV === "production") {
      this.dateService = new ProdDateService();
    } else {
      this.dateService = new DevDateService();
    }
  }

  // -- Método de encontrar tudo: ---
  // Não necessita de tratamento de erro pois lista é sempre encontrada, mesmo que vazia.
  async findAll(): Promise<Postagem[]> {
    // SELECT * FROM tb_postagem;
    const postList = await this.postagemRepository.find({
      relations: {
        tema: true,
        usuario: true,
      },
    });

    // Verifique se a lista de postagem está vazia.
    if (postList.length === 0) {
      throw new HttpException(
        "Nenhuma postagem encontrada.",
        HttpStatus.NOT_FOUND,
      );
    }

    // Retorna a lista se houver algum item.
    return postList;
  }

  // --- Método de encontrar pelo Id: ---
  async findById(id: number): Promise<Postagem> {
    // SELECT * FROM tb_postagem WHERE id = id;
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });

    // Se o id não for encontrado, retorna o erro 404 com a mensagem.
    if (!postagem)
      throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND);

    return postagem;
  }

  // --- Método de Encotrar pelo título: ---
  // Não necessita de tratamento de erro pois lista é sempre encontrada, mesmo que vazia.
  async findByTitulo(titulo: string): Promise<Postagem[]> {
    // SELECT * FROM tb_postagem WHERE titulo LIKE "%titulo%";
    const postList = await this.postagemRepository.find({
      where: {
        // ILike é CaseSensetive e o Like não.
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });

    // Verifique se a lista de postagem está vazia.
    if (postList.length === 0) {
      throw new HttpException(
        "Nenhuma postagem encontrada.",
        HttpStatus.NOT_FOUND,
      );
    }

    // Retorna a lista se houver algum item.
    return postList;
  }

  // --- Método de cadastrar: ---
  async create(
    postagem: Postagem,
  ): Promise<{ message: string; postagem: Postagem }> {
    try {
      // Verifica se o id do tema existe antes da criação;
      await this.temaService.findById(postagem.tema.id);
      postagem.data = this.dateService.getCurrentDate();
      // INSERT INTO tb_postagens (titulo, texto, data) VALUES ("Título", "Texto", CURRENT_TIMESTAMP());
      const createdPost = await this.postagemRepository.save(postagem);
      return {
        message: "Postagem criada com sucesso!",
        postagem: createdPost,
      };
    } catch (error) {
      throw new HttpException(
        "Erro ao criar postagem! Verifique os dados enviados.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // --- Método de atualizar: ---
  async update(
    postagem: Postagem,
  ): Promise<{ message: string; postagem: Postagem }> {
    // Tratamento para se o id não existir.
    await this.findById(postagem.id);
    if (!postagem.id) {
      throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND);
    }

    // Verifica se o id do tema existe antes de atualizar;
    await this.temaService.findById(postagem.tema.id);

    try {
      // UPDATE tb_postagem SET postagem WHERE id = postagem.id;
      const updatedPost = await this.postagemRepository.save(postagem);
      return {
        message: "Postagem atualizada com sucesso!",
        postagem: updatedPost,
      };
    } catch (error) {
      throw new HttpException(
        "Erro ao atualizar a postagem! Verifique os dados enviados.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // --- Método de deletar: ---
  async delete(id: number): Promise<{ message: string }> {
    // DELETE FROM tb_postagem WHERE id = id;
    await this.findById(id);
    try {
      await this.postagemRepository.delete(id);
      return {
        message: `Postagem de id ${id} deletada com sucesso!`,
      };
    } catch (error) {
      throw new HttpException(
        "Erro ao deletar postagem.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}