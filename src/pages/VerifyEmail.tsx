
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';

const VerifyEmail = () => {
  const [isSending, setIsSending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  // Obtener el correo del usuario (en un sistema real vendría del backend)
  const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email || 'tu@email.com';

  const handleResendEmail = async () => {
    setIsSending(true);
    
    try {
      // Simulamos el envío del correo (esto se conectaría a una API real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Correo de verificación enviado');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      toast.error('Error al enviar el correo de verificación');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = () => {
    // Simulamos la verificación (en un sistema real, esto se haría a través de un enlace en el correo)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.isVerified = true;
    localStorage.setItem('user', JSON.stringify(user));
    setIsVerified(true);
    toast.success('¡Correo verificado correctamente!');
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-whatsapp" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Correo verificado!</h2>
            <p className="text-gray-600 mb-8">Tu cuenta ha sido verificada correctamente. Ahora puedes disfrutar de todos los beneficios de nuestra tienda.</p>
            <Link to="/login">
              <Button className="bg-whatsapp hover:bg-whatsapp-dark text-white">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            Hemos enviado un correo de verificación a <span className="font-semibold">{userEmail}</span>.
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
            
            {/* Botón para simular la verificación (solo para demostración) */}
            <Button 
              onClick={handleVerify} 
              className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white"
            >
              Simular verificación (demo)
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
