
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, Lock, LogIn } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validación básica
    if (!formData.email || !formData.password) {
      toast.error('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    try {
      // Simulamos la autenticación (esto se conectaría a una API real más adelante)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificamos si el usuario existe en localStorage (temporal)
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        toast.error('Usuario no encontrado');
        setLoading(false);
        return;
      }
      
      const user = JSON.parse(userStr);
      if (user.email !== formData.email) {
        toast.error('Credenciales incorrectas');
        setLoading(false);
        return;
      }
      
      // En un sistema real, verificaríamos la contraseña hash
      
      // Guardamos el estado de la sesión
      localStorage.setItem('isLoggedIn', 'true');
      
      toast.success('Inicio de sesión exitoso');
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Iniciar Sesión</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
                  <Link to="/reset-password" className="text-xs text-whatsapp hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Iniciar Sesión'} 
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="text-whatsapp hover:underline font-medium">
                  Registrarse
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
