
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
  BarChart3,
  Save,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { ProductList } from '@/components/admin/ProductList';
import { ProductForm } from '@/components/admin/ProductForm';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Product, getAllProducts } from '@/lib/productData';

const Admin = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    featured: false,
    category: '',
  });

  useEffect(() => {
    if (!currentUser) {
      toast.error('Debes iniciar sesión para acceder al panel de administración');
      navigate('/login');
      return;
    }
    
    const loadedProducts = getAllProducts();
    setProducts(loadedProducts);
  }, [navigate, currentUser]);

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
    if (!productForm.name || productForm.price <= 0 || !productForm.description || !productForm.imageUrl) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    toast.success(`Producto ${editingProduct ? 'actualizado' : 'creado'} con éxito`);
    
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === productForm.id ? {...productForm as unknown as Product} : p));
    } else {
      const newProduct = {
        ...productForm,
        id: Date.now(),
      } as Product;
      setProducts(prev => [...prev, newProduct]);
    }
    
    setEditingProduct(null);
    setProductForm({
      id: 0,
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      featured: false,
      category: '',
    });
  };

  const handleDeleteProduct = (id: number) => {
    toast.success('Producto eliminado con éxito');
    setProducts(prev => prev.filter(p => p.id !== id));
  };

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

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
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
                    <ProductForm 
                      productForm={productForm} 
                      editingProduct={editingProduct}
                      handleProductFormChange={handleProductFormChange}
                      handleSaveProduct={handleSaveProduct}
                      handleCancel={() => {
                        setEditingProduct(null);
                        setProductForm({
                          id: 0,
                          name: '',
                          price: 0,
                          description: '',
                          imageUrl: '',
                          featured: false,
                          category: '',
                        });
                      }}
                    />
                  )}
                  
                  <ProductList 
                    products={products} 
                    onEdit={handleEditProduct} 
                    onDelete={handleDeleteProduct} 
                  />
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
