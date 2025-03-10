
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from './CartItem';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/productData';
import WhatsAppButton from './WhatsAppButton';

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { cart, clearCart, totalPrice } = useCart();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Tu Carrito de Compras</h2>
        <Button variant="ghost" size="sm" onClick={onClose} aria-label="Cerrar">
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Tu carrito está vacío</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={onClose}
            >
              Continuar comprando
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                productId={item.product.id}
                name={item.product.name}
                price={item.product.price}
                imageUrl={item.product.imageUrl}
                quantity={item.quantity}
              />
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
            <p>Subtotal</p>
            <p>{formatPrice(totalPrice)}</p>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Los gastos de envío se calculan al finalizar la compra.
          </p>
          <Separator className="my-4" />
          <div className="space-y-3">
            <WhatsAppButton 
              cart={cart} 
              total={totalPrice} 
              onComplete={() => {
                clearCart();
                onClose();
              }} 
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={clearCart}
            >
              Vaciar carrito
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
