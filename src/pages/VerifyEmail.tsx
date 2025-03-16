
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const VerifyEmail = () => {
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { currentUser, sendVerificationEmail } = useAuth();
  
  useEffect(() => {
    // Si no hay usuario, redirigir al login
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Si el usuario ya está verificado, redirigir a la página principal
    if (currentUser.emailVerified) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // Si no hay usuario, no renderizar nada (para evitar parpadeo antes de la redirección)
  if (!currentUser) return null;

  const handleResendEmail = async () => {
    setIsSending(true);
    
    try {
      await sendVerificationEmail();
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      // El mensaje de error es manejado por el AuthContext
    } finally {
      setIsSending(false);
    }
  };

  // Para fines de demo, agregamos una función para recargar y verificar si el correo ha sido verificado
  const checkVerification = () => {
    currentUser.reload().then(() => {
      if (currentUser.emailVerified) {
        toast.success('¡Correo verificado correctamente!');
        navigate('/');
      } else {
        toast.error('Tu correo aún no ha sido verificado');
      }
    }).catch(error => {
      console.error('Error al verificar estado:', error);
      toast.error('Error al verificar estado de verificación');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Verifica tu correo electrónico</h2>
          <p className="text-gray-600 mb-6">
            Hemos enviado un correo de verificación a <span className="font-semibold">{currentUser.email}</span>.
            Haz clic en el enlace del correo para verificar tu cuenta.
          </p>
          <div className="space-y-4">
            <Button 
              onClick={handleResendEmail} 
              variant="outline" 
              className="w-full" 
              disabled={isSending}
            >
              {isSending ? 'Enviando...' : 'Reenviar correo de verificación'}
            </Button>
            
            {/* Botón para verificar el estado de verificación */}
            <Button 
              onClick={checkVerification} 
              className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white"
            >
              Verificar estado
            </Button>
            
            <p className="text-sm text-gray-500 mt-6">
              ¿Ingresaste un correo incorrecto?{' '}
              <Link to="/register" className="text-whatsapp hover:underline">
                Regístrate nuevamente
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
