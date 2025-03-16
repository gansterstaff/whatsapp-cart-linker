
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  sendEmailVerification, 
  updatePassword,
  User,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Registro de usuario
  const register = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Actualizar el perfil del usuario con su nombre
      await updateProfile(user, {
        displayName: name
      });
      
      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });
      
      // Enviar email de verificación
      await sendVerificationEmail();
      
      return;
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Este correo electrónico ya está en uso");
      } else {
        toast.error(`Error al registrar: ${error.message}`);
      }
      throw error;
    }
  };

  // Inicio de sesión
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error("Credenciales incorrectas");
      } else {
        toast.error(`Error al iniciar sesión: ${error.message}`);
      }
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      toast.error(`Error al cerrar sesión: ${error.message}`);
      throw error;
    }
  };

  // Actualizar perfil
  const updateUserProfile = async (name: string) => {
    if (!currentUser) throw new Error("No hay usuario autenticado");
    
    try {
      await updateProfile(currentUser, {
        displayName: name
      });
      
      // Actualizar también en Firestore
      await setDoc(doc(db, "users", currentUser.uid), {
        name
      }, { merge: true });
      
      toast.success("Perfil actualizado con éxito");
    } catch (error: any) {
      console.error("Error al actualizar perfil:", error);
      toast.error(`Error al actualizar perfil: ${error.message}`);
      throw error;
    }
  };

  // Actualizar contraseña
  const updateUserPassword = async (newPassword: string) => {
    if (!currentUser) throw new Error("No hay usuario autenticado");
    
    try {
      await updatePassword(currentUser, newPassword);
      toast.success("Contraseña actualizada con éxito");
    } catch (error: any) {
      console.error("Error al actualizar contraseña:", error);
      toast.error(`Error al actualizar contraseña: ${error.message}`);
      throw error;
    }
  };

  // Enviar email de verificación
  const sendVerificationEmail = async () => {
    if (!currentUser) throw new Error("No hay usuario autenticado");
    
    try {
      await sendEmailVerification(currentUser);
      toast.success("Correo de verificación enviado");
    } catch (error: any) {
      console.error("Error al enviar correo de verificación:", error);
      toast.error(`Error al enviar correo de verificación: ${error.message}`);
      throw error;
    }
  };

  // Restablecer contraseña
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Correo para restablecer contraseña enviado");
    } catch (error: any) {
      console.error("Error al enviar correo de restablecimiento:", error);
      toast.error(`Error al enviar correo de restablecimiento: ${error.message}`);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    updateUserProfile,
    updateUserPassword,
    sendVerificationEmail,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
