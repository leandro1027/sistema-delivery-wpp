'use client';

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../store/useCartStore";

interface Produto {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  imagemUrl: string | null;
}

export function ProdutoCard({ produto }: { produto: Produto }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1,
    });
  };

  // Imagem genérica super bonita para testes caso o produto não tenha foto no banco
  const defaultImage = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Container da Imagem */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img 
          src={produto.imagemUrl || defaultImage} 
          alt={produto.nome}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Tag de destaque (exemplo) */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          Popular
        </span>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-slate-800 text-lg leading-tight">{produto.nome}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mt-2 flex-grow">
          {produto.descricao || "Delicioso e preparado com ingredientes selecionados frescos."}
        </p>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-50">
          <span className="font-extrabold text-lg text-slate-900">
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </span>
          <Button 
            onClick={handleAdd} 
            size="icon" 
            className="h-9 w-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-colors"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}