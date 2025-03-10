
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/productData';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  productId,
  name,
  price,
  imageUrl,
  quantity,
}) => {
  const { updateQuantity, removeFromCart } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(productId, quantity + 1);
  };

  return (
    <div className="flex py-4 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="line-clamp-1">{name}</h3>
            <p className="ml-4">{formatPrice(price * quantity)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{formatPrice(price)} / unidad</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={decreaseQuantity}
              aria-label="Reducir cantidad"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-gray-700 w-4 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={increaseQuantity}
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(productId)}
            className="text-red-500 hover:text-red-700"
            aria-label="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
