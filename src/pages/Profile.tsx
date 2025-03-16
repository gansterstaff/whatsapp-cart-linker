
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User, Mail, Lock, Save, LogOut, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout, updateUserProfile, updateUserPassword, sendVerificationEmail } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Cargar datos del usuario
    if (currentUser) {
      setFormData(prev => ({ ...prev, name: currentUser.displayName || '' }));
    }
  }, [currentUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Actualizar nombre
      if (formData.name !== currentUser?.displayName) {
        await updateUserProfile(formData.name);
      }

      // Actualizar contraseña si se proporcionó
      if (formData.newPassword) {
        // Validar que las contraseñas coincidan
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error('Las contraseñas no coinciden');
          setLoading(false);
          return;
        }

        await updateUserPassword(formData.newPassword);
      }

      // Limpiar los campos de contraseña
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      // Los mensajes de error son manejados por el AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    setVerifyEmailLoading(true);
    try {
      await sendVerificationEmail();
    } catch (error) {
      console.error('Error al enviar correo de verificación:', error);
    } finally {
      setVerifyEmailLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <div className="w-16 h-16 bg-whatsapp-light rounded-full flex items-center justify-center text-whatsapp mr-4">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{currentUser.displayName}</h2>
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-gray-600 text-sm">{currentUser.email}</span>
                    {currentUser.emailVerified ? (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <Check className="h-3 w-3 mr-1" /> Verificado
                      </span>
                    ) : (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={handleSendVerificationEmail}
                        disabled={verifyEmailLoading}
                        className="ml-2 text-xs text-amber-600 hover:text-amber-700"
                      >
                        {verifyEmailLoading ? 'Enviando...' : 'Verificar email'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Cambiar contraseña</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">Contraseña actual</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.currentPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">Nueva contraseña</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.newPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLogout}
                    className="flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </Button>
                  
                  <Button
                    type="submit"
                    className="bg-whatsapp hover:bg-whatsapp-dark text-white flex items-center"
                    disabled={loading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? 'Guardando...' : 'Guardar cambios'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
