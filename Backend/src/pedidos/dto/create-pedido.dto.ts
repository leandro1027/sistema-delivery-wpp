export class CreateItemPedidoDto {
  produtoId!: string;
  quantidade!: number;
  precoUnitario!: number;
  observacao?: string;
}

export class CreatePedidoDto {
  clienteId!: string;
  total!: number;
  metodoPagamento!: string;
  itens!: CreateItemPedidoDto[]; 
}