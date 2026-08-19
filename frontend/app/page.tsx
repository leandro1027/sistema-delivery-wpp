import { ProdutoCard } from "@/src/components/ProdutoCard";
import { CartSheet } from "@/src/components/CartSheet";
import { Search, Clock, Info, MapPin } from "lucide-react";

interface Produto {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  imagemUrl: string | null;
}

interface Categoria {
  id: string;
  nome: string;
  produtos: Produto[];
}

// Função modificada para retornar dados estáticos incríveis para testar o visual
async function getCategorias(): Promise<Categoria[]> {
  return [
    {
      id: "cat-destaques",
      nome: "Destaques",
      produtos: [
        {
          id: "prod-1",
          nome: "Fritas Pequena (200gr)",
          descricao: "Porção individual de batatas fritas super crocantes e sequinhas.",
          preco: 9.90,
          imagemUrl: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop"
        },
        {
          id: "prod-2",
          nome: "Pudim (300gr)",
          descricao: "Pudim feito de receita caseira, derrete na boca.",
          preco: 9.90,
          imagemUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600&auto=format&fit=crop"
        },
        {
          id: "prod-3",
          nome: "Tops Burguer",
          descricao: "Burgão de 200gr com molho cheddar e farofa de bacon crocante.",
          preco: 20.90,
          imagemUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"
        },
        {
          id: "prod-4",
          nome: "Veganito",
          descricao: "Hambúrguer de berinjela delicioso e 100% natural, pão integral.",
          preco: 14.90,
          imagemUrl: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=600&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "cat-bebidas",
      nome: "Bebidas",
      produtos: [
        {
          id: "prod-5",
          nome: "Refrigerante Cola Lata",
          descricao: "Lata 350ml estupidamente gelada.",
          preco: 5.50,
          imagemUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop"
        },
        {
          id: "prod-6",
          nome: "Suco de Laranja Natural",
          descricao: "Garrafa 500ml feito na hora, sem adição de açúcar.",
          preco: 8.00,
          imagemUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600&auto=format&fit=crop"
        }
      ]
    }
  ];
}

export default async function Vitrine() {
  const categorias = await getCategorias();
  const bannerUrl = "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans pb-24">
      
      {/* 1. Navbar Superior Escura */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden sm:flex justify-between items-center">
        <div className="max-w-6xl mx-auto w-full flex justify-between">
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">Site Institucional</span>
            <span className="hover:text-white cursor-pointer transition">Fale Conosco</span>
          </div>
          <div className="flex gap-4">
            <span>Este é um delivery de demonstração</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section (Banner) */}
      <section className="relative w-full h-[280px] md:h-[350px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        />
        <div className="absolute inset-0 bg-black/60" /> 
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 text-red-500 font-semibold mb-2 bg-red-500/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
            <MapPin className="h-4 w-4" />
            <span className="text-sm text-white">União da Vitória, PR</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-2">
            Hamburgueria Demo
          </h1>
          <p className="text-slate-300 text-lg max-w-xl">
            Os melhores lanches da região. Peça agora e receba quentinho.
          </p>
        </div>

        {/* Card Flutuante de Informações */}
        <div className="absolute -bottom-6 right-4 md:right-auto md:left-2/3 lg:left-3/4 bg-white p-5 rounded-xl shadow-xl border border-slate-100 hidden md:block w-72">
          <div className="flex items-start gap-3 mb-3">
            <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800">Horário:</p>
              <p className="text-xs text-slate-500">das 18:00 às 23:30 <span className="text-emerald-500 font-semibold">(Aberto)</span></p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800">Estimativa de entrega:</p>
              <p className="text-xs text-slate-500">30 a 45 minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Barra de Navegação Branca (Sticky) */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <nav className="flex overflow-x-auto gap-1 scrollbar-hide py-1">
            <a href="#" className="px-4 py-2 text-sm font-bold text-red-600 border-b-2 border-red-600 whitespace-nowrap">
              Início
            </a>
            {categorias.map(cat => (
              <a 
                key={cat.id} 
                href={`#cat-${cat.id}`}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap"
              >
                {cat.nome}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <CartSheet />
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-4 z-50 md:hidden">
        <CartSheet />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* Barra de Pesquisa */}
        <div className="relative mb-12 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Pesquisar produto..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm text-slate-700"
          />
        </div>

        {/* 4. Grid de Produtos */}
        <div className="space-y-16">
          {categorias.map((categoria) => (
            <section key={categoria.id} id={`cat-${categoria.id}`} className="scroll-mt-32">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-6 tracking-tight">
                {categoria.nome}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoria.produtos?.map((produto) => (
                  <ProdutoCard key={produto.id} produto={produto} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}