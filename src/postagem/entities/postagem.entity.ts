import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

// Entidade com criação da tabela "tb_postagens".
@Entity({name: "tb_postagens"})
export class Postagem {

    // Definição da coluna ID com chave primária e preenchimento automático.
    @ApiProperty()  // ID da postagem
    @PrimaryGeneratedColumn() // Chave primária gerada automaticamente
    id: number

    // Definição da coluna titulo, não nula, do tipo string com tamanho 100 caracteres.
    @ApiProperty()  // Título da postagem
    @IsNotEmpty() // Título da postagem não pode ser vazio
    @Column({length: 100, nullable: false})
    titulo: string

    // Definição da coluna texto, não nula, do tipo string com tamanho 1000 caracteres.
    @ApiProperty()  // Texto da postagem
    @IsNotEmpty() // Texto da postagem não pode ser vazio
    @Column({length: 1000, nullable: false})
    texto: string

    // Definição da coluna data com preenchimento automático da data/hora.
    @ApiProperty()  
    @UpdateDateColumn() // Data da postagem
    data: Date

    // Cria a relação de Many-to-One com a tabela tb_temas.
    @ApiProperty({ type: () => Tema }) // Tema da postagem
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema

    // Cria a relação de Many-to-One com a tabela tb_usuarios.
    @ApiProperty({ type: () => Usuario })  // Usuário da postagem
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}
