import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: createCategoriaDto,
    });
  }

  async findAll() {
    // Retorna todas as categorias ordenadas pela coluna 'ordem'
    return this.prisma.categoria.findMany({
      orderBy: { ordem: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.categoria.findUnique({
      where: { id },
      include: { produtos: true }, // Traz os produtos dessa categoria junto
    });
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data: updateCategoriaDto,
    });
  }

  async remove(id: string) {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}