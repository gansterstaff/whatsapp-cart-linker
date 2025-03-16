
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_mRkyzPj6FfGGLss_-lqyhcQGqs5jxWY",
  authDomain: "ecommercewssp.firebaseapp.com",
  projectId: "ecommercewssp",
  storageBucket: "ecommercewssp.firebasestorage.app",
  messagingSenderId: "468974862588",
  appId: "1:468974862588:web:13150c0b5530f8ea815779"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
