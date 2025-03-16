
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Menu, X, Search, User, LogIn, UserPlus, UserCheck, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from './Cart';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, we would navigate to search results
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            WhatsShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Inicio
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Productos
            </Link>
          </nav>

          {/* Search Form - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-1/3">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-whatsapp"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            {currentUser ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    <span className="hidden sm:inline">{currentUser.displayName || 'Perfil'}</span>
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    <span className="hidden sm:inline">Ingresar</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    <span className="hidden sm:inline">Registro</span>
                  </Button>
                </Link>
              </>
            )}

            {/* Cart Button */}
            <Button
              variant="ghost"
              onClick={toggleCart}
              className="relative"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-whatsapp text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="md:hidden"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 space-y-4">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Productos
            </Link>
            
            {/* Auth Links in Mobile Menu */}
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    <span>Mi Perfil</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    <span>Iniciar Sesión</span>
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Registrarse</span>
                  </div>
                </Link>
              </>
            )}
            
            {/* Search Form - Mobile */}
            <form onSubmit={handleSearch} className="px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-whatsapp focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-whatsapp"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleCart}
          ></div>
          <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <Cart onClose={toggleCart} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
