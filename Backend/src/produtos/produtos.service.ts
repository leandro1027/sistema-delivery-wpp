import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    return this.prisma.produto.create({
      data: createProdutoDto,
    });
  }

  async findAll() {
    return this.prisma.produto.findMany({
      include: { categoria: true }, // Traz os dados da categoria junto com o produto
    });
  }

  async findOne(id: string) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: { categoria: true },
    });
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    return this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });
  }

  async remove(id: string) {
    return this.prisma.produto.delete({
      where: { id },
    });
  }
}