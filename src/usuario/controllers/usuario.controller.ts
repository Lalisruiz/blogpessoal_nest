import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";


@Controller("/usuarios")
export class UsuarioController{

    constructor(private readonly usuarioService: UsuarioService){ }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Usuario[]>{
        return await this.usuarioService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return await this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return await this.usuarioService.update(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.usuarioService.delete(id);
    }
}
