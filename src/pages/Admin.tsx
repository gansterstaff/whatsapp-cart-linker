
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  BarChart3 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Product, getAllProducts } from '@/lib/productData';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    id: 0, // Changed from string to number to match Product type
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    featured: false,
    category: '',
  });

  useEffect(() => {
    // Verificar autenticación (simplificado para demo)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast.error('Debes iniciar sesión para acceder al panel de administración');
      navigate('/login');
      return;
    }
    
    // En un sistema real verificaríamos si el usuario tiene rol de administrador
    setIsAuthenticated(true);
    
    // Cargar productos
    const loadedProducts = getAllProducts();
    setProducts(loadedProducts);
  }, [navigate]);

  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : type === 'number' 
          ? parseFloat(value) 
          : value
    }));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      featured: product.featured || false,
      category: product.category || '',
    });
  };

  const handleSaveProduct = () => {
    // Validación básica
    if (!productForm.name || productForm.price <= 0 || !productForm.description || !productForm.imageUrl) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    // En un sistema real, esto se enviaría a una API
    toast.success(`Producto ${editingProduct ? 'actualizado' : 'creado'} con éxito`);
    
    // Actualizar la lista local (simulación)
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === productForm.id ? {...productForm as unknown as Product} : p));
    } else {
      const newProduct = {
        ...productForm,
        id: Date.now(), // Generate a numeric ID instead of string
      } as Product;
      setProducts(prev => [...prev, newProduct]);
    }
    
    // Limpiar formulario
    setEditingProduct(null);
    setProductForm({
      id: 0, // Reset to 0 instead of empty string
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      featured: false,
      category: '',
    });
  };

  const handleDeleteProduct = (id: number) => { // Change parameter type to number
    // En un sistema real, esto se enviaría a una API
    toast.success('Producto eliminado con éxito');
    
    // Actualizar la lista local (simulación)
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-whatsapp text-white">
                <h2 className="font-semibold text-lg">Dashboard</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-md ${
                        activeTab === 'dashboard' 
                          ? 'bg-whatsapp-light text-whatsapp font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Estadísticas
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('products')}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-md ${
                        activeTab === 'products' 
                          ? 'bg-whatsapp-light text-whatsapp font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Package className="mr-2 h-5 w-5" />
                      Productos
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-md ${
                        activeTab === 'orders' 
                          ? 'bg-whatsapp-light text-whatsapp font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Pedidos
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('users')}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-md ${
                        activeTab === 'users' 
                          ? 'bg-whatsapp-light text-whatsapp font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Usuarios
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-md ${
                        activeTab === 'settings' 
                          ? 'bg-whatsapp-light text-whatsapp font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Configuración
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Content area */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-blue-700 text-lg font-medium">Usuarios</h3>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-green-700 text-lg font-medium">Productos</h3>
                      <p className="text-3xl font-bold">{products.length}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-purple-700 text-lg font-medium">Pedidos</h3>
                      <p className="text-3xl font-bold">8</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Gestión de Productos</h2>
                    {!editingProduct && (
                      <Button 
                        onClick={() => setEditingProduct({} as Product)} 
                        className="bg-whatsapp hover:bg-whatsapp-dark text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Producto
                      </Button>
                    )}
                  </div>
                  
                  {editingProduct !== null && (
                    <div className="mb-8 p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">
                        {editingProduct.id ? 'Editar Producto' : 'Nuevo Producto'}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nombre <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={productForm.name}
                            onChange={handleProductFormChange}
                            placeholder="Nombre del producto"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="price" className="text-sm font-medium text-gray-700">
                            Precio <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            value={productForm.price.toString()}
                            onChange={handleProductFormChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="category" className="text-sm font-medium text-gray-700">
                            Categoría
                          </label>
                          <Input
                            id="category"
                            name="category"
                            value={productForm.category}
                            onChange={handleProductFormChange}
                            placeholder="Categoría"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">
                            URL de la imagen <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="imageUrl"
                            name="imageUrl"
                            value={productForm.imageUrl}
                            onChange={handleProductFormChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Descripción <span className="text-red-500">*</span>
                          </label>
                          <Textarea
                            id="description"
                            name="description"
                            value={productForm.description}
                            onChange={handleProductFormChange}
                            placeholder="Descripción del producto"
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <div className="flex items-center space-x-2">
                            <input
                              id="featured"
                              name="featured"
                              type="checkbox"
                              checked={productForm.featured}
                              onChange={handleProductFormChange}
                              className="h-4 w-4 text-whatsapp rounded border-gray-300 focus:ring-whatsapp"
                            />
                            <label htmlFor="featured" className="text-sm text-gray-700">
                              Destacado en la página principal
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(null);
                            setProductForm({
                              id: '',
                              name: '',
                              price: 0,
                              description: '',
                              imageUrl: '',
                              featured: false,
                              category: '',
                            });
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleSaveProduct}
                          className="bg-whatsapp hover:bg-whatsapp-dark text-white"
                        >
                          Guardar
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Producto
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoría
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Destacado
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-md object-cover" 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.category || '—'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {product.featured ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Sí
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Gestión de Pedidos</h2>
                  <p className="text-gray-500">Los detalles de los pedidos se mostrarán aquí.</p>
                </div>
              )}
              
              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
                  <p className="text-gray-500">Los detalles de los usuarios se mostrarán aquí.</p>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Configuración</h2>
                  <p className="text-gray-500">La configuración del sitio se mostrará aquí.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
