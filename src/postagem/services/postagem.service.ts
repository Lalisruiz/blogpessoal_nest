import { HttpException, HttpStatus, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Like, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private readonly postagemRepository: Repository<Postagem>,
    ) {}

    async findAll(): Promise<Postagem[]> {
        const postagens = await this.postagemRepository.find();

        if (!postagens || postagens.length === 0)
            throw new NotFoundException('Nenhuma postagem encontrada');

        return postagens;
    }

    async findById(id: number): Promise<Postagem> {
        const postagem = await this.postagemRepository.findOne({ where: { id } });
        if (!postagem) {
            throw new NotFoundException(`Postagem com id ${id} não encontrada`);
        }
        return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: { 
                titulo: ILike(`%${titulo}%`) 
            },
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
}

async update(id: number, postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);

    return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {

        const buscaPostagem = await this.findById(id);
        if (!buscaPostagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        return await this.postagemRepository.delete(id);

    }


}
