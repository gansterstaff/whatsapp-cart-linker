
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import { getProductById, formatPrice } from '@/lib/productData';
import { useCart } from '@/contexts/CartContext';
import WhatsAppButton from '@/components/WhatsAppButton';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = id ? parseInt(id) : 0;
  const product = getProductById(productId);
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // If product is not found, show error
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <p className="text-gray-600 mb-8">Lo sentimos, el producto que estás buscando no existe.</p>
          <Button onClick={() => navigate('/products')}>Volver a la tienda</Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Find if this product is already in the cart
  const isInCart = cart.find(item => item.product.id === product.id);

  // Calculate immediate checkout data for WhatsApp button
  const immediateCheckoutCart = [{ product, quantity }];
  const immediateCheckoutTotal = product.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-gray-900">Productos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
          
          <Link to="/products" className="inline-flex items-center mt-4 text-sm text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a productos
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-2xl text-gray-900 font-semibold my-4">{formatPrice(product.price)}</p>
              
              <div className="prose text-gray-600 mb-6">
                <p>{product.description}</p>
              </div>
              
              <Separator className="my-6" />
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4 text-gray-700">Cantidad</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none border-r border-gray-300"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10 rounded-none border-l border-gray-300"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                <Button
                  onClick={handleAddToCart}
                  className="bg-whatsapp hover:bg-whatsapp-dark text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isInCart ? 'Actualizar carrito' : 'Añadir al carrito'}
                </Button>
                
                <WhatsAppButton 
                  cart={immediateCheckoutCart} 
                  total={immediateCheckoutTotal} 
                  onComplete={() => {}} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WhatsShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
