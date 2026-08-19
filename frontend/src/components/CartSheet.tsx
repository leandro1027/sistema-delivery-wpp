'use client';

import { ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function CartSheet() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    // O payload exato que o seu backend NestJS espera no DTO
    const payload = {
      clienteId: 'ID_MOCK_DO_CLIENTE_AQUI', // Em breve substituiremos pelo ID real após o login/identificação
      total: total,
      metodoPagamento: 'PIX', 
      itens: items.map(item => ({
        produtoId: item.id,
        quantidade: item.quantidade,
        precoUnitario: item.preco,
        observacao: item.observacao || '',
      }))
    };

    try {
      const res = await fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        clearCart();
        alert('Pedido finalizado com sucesso! Você receberá uma confirmação no WhatsApp.');
      } else {
        alert('Erro ao processar pedido.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="relative flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-md transition-colors hover:bg-gray-100">
        <ShoppingBag className="h-6 w-6 text-gray-700" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {items.reduce((acc, item) => acc + item.quantidade, 0)}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Seu Pedido</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 mt-6 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.nome}</h4>
                    <p className="text-sm font-bold text-emerald-600">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white border rounded-md">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, Math.max(1, item.quantidade - 1))}>-</Button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantidade}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantidade + 1)}>+</Button>
                    </div>
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="pt-6 mt-auto">
          <Separator className="mb-4" />
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total:</span>
            <span className="text-emerald-600">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <SheetFooter>
            <Button className="w-full" size="lg" disabled={items.length === 0} onClick={handleCheckout}>
              Finalizar Pedido
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}