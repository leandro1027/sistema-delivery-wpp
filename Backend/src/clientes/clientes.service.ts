import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  async findAll() {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: string) {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: { pedidos: true }, 
    });
  }

  async findByTelefone(telefone: string) {
    return this.prisma.cliente.findUnique({
      where: { telefone },
    });
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    return this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: string) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}