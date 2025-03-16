
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      return;
    }
    
    setLoading(true);
    
    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
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
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Restablecer contraseña
            </h2>
            
            {submitted ? (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Correo enviado</h3>
                <p className="text-gray-600 mb-6">
                  Hemos enviado instrucciones para restablecer tu contraseña a <span className="font-medium">{email}</span>. 
                  Por favor revisa tu bandeja de entrada.
                </p>
                <Link to="/login">
                  <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a inicio de sesión
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Ingresa el correo electrónico asociado a tu cuenta y te enviaremos instrucciones para restablecer tu contraseña.
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar instrucciones'}
                </Button>
                
                <div className="text-center">
                  <Link to="/login" className="text-sm text-whatsapp hover:underline">
                    Volver a inicio de sesión
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
