
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product, formatPrice } from '@/lib/productData';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2 h-10">
            {product.description}
          </p>
        </Link>
        <div className="mt-4">
          <Button 
            onClick={() => addToCart(product)} 
            className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Añadir al carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
