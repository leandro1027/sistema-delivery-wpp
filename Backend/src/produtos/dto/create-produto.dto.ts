export class CreateProdutoDto {
  nome!: string;
  descricao?: string;
  preco!: number;
  imagemUrl?: string; 
  ativo?: boolean;
  categoriaId?: string;
}