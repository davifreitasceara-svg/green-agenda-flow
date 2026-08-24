import { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("PIX");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = `Olá, gostaria de finalizar um pedido! 🛒\n\n*Resumo do Pedido:*\n`;
    
    items.forEach((item) => {
      const sizeText = item.size ? ` (Tamanho: ${item.size})` : "";
      message += `${item.quantity}x ${item.product.name}${sizeText} - ${formatPrice(item.product.price * item.quantity)}\n`;
    });

    message += `\n*Total:* ${formatPrice(totalPrice)}\n`;
    message += `*Forma de Pagamento:* ${paymentMethod}\n\n`;
    message += `Aguardo o retorno para prosseguir com o pagamento e envio das informações de personalização!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/558596668021?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md bg-surface p-0">
        <SheetHeader className="p-6 border-b border-border/50 bg-background">
          <SheetTitle className="flex items-center gap-2 font-display text-2xl text-primary">
            <ShoppingBag className="h-6 w-6" />
            Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-6">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Seu carrinho está vazio</p>
                <p className="text-sm text-muted-foreground">Adicione alguns produtos para continuar.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 rounded-xl border border-border/50 bg-background p-3 shadow-sm">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-border/50">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-foreground line-clamp-2 leading-tight">
                          {item.product.name}
                        </h4>
                        {item.size && (
                          <p className="mt-0.5 text-[10px] uppercase font-bold text-muted-foreground">
                            Tam: {item.size}
                          </p>
                        )}
                        <p className="mt-1 text-sm font-medium text-primary">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-border bg-surface">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-accent hover:text-primary rounded-l-lg transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-foreground hover:bg-accent hover:text-primary rounded-r-lg transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/50 bg-background p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Forma de Pagamento
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="PIX">PIX (Mais rápido)</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>

            <div className="flex items-center justify-between font-medium pt-2 border-t border-border/50">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg text-primary">{formatPrice(totalPrice)}</span>
            </div>

            <SheetFooter>
              <button
                onClick={handleCheckout}
                className="w-full rounded-full bg-primary py-3 px-4 font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Finalizar no WhatsApp
              </button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
