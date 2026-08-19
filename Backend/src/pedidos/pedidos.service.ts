import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Injectable()
export class PedidosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly whatsappService: WhatsappService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    // 1. Salva o pedido e os itens em uma única transação no banco
    const pedidoSalvo = await this.prisma.pedido.create({
      data: {
        clienteId: createPedidoDto.clienteId,
        total: createPedidoDto.total,
        formaPagamento: createPedidoDto.formaPagamento,
        status: 'PENDENTE',
        itens: {
          create: createPedidoDto.itens.map(item => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            observacao: item.observacao,
          })),
        },
      },
      include: {
        itens: true,
        cliente: true, // Trazemos os dados do cliente para ter acesso ao telefone e nome
      },
    });

    // 2. Dispara a mensagem de confirmação no WhatsApp
    const telefoneCliente = pedidoSalvo.cliente.telefone;
    const mensagem = `🍔 *Novo Pedido Recebido!*\n\nOlá ${pedidoSalvo.cliente.nome}, seu pedido foi registrado com sucesso!\n*Total:* R$ ${pedidoSalvo.total.toFixed(2)}\n*Status:* PENDENTE\n\nAvisaremos por aqui quando sair para entrega.`;
    
    // O envio roda em background para não travar o retorno da requisição
    this.whatsappService.enviarMensagem(telefoneCliente, mensagem).catch(err => {
      console.error('Erro ao enviar mensagem de confirmação:', err);
    });

    return pedidoSalvo;
  }

  async findAll() {
    return this.prisma.pedido.findMany({
      include: { cliente: true },
      orderBy: { criadoEm: 'desc' }, // Retorna os pedidos mais recentes primeiro
    });
  }

  async findOne(id: string) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
        itens: { include: { produto: true } }, // Inclui o lanche/produto vinculado a cada item
      },
    });
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    // Removemos os 'itens' do DTO para evitar o erro de tipagem no Prisma
    const { itens, ...dadosAtualizacao } = updatePedidoDto;

    return this.prisma.pedido.update({
      where: { id },
      data: dadosAtualizacao,
    });
  }

  async remove(id: string) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}