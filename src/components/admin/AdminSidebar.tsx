
import React from 'react';
import { BarChart3, Package, ShoppingCart, Users, Settings } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Estadísticas', icon: <BarChart3 className="mr-2 h-5 w-5" /> },
    { id: 'products', label: 'Productos', icon: <Package className="mr-2 h-5 w-5" /> },
    { id: 'orders', label: 'Pedidos', icon: <ShoppingCart className="mr-2 h-5 w-5" /> },
    { id: 'users', label: 'Usuarios', icon: <Users className="mr-2 h-5 w-5" /> },
    { id: 'settings', label: 'Configuración', icon: <Settings className="mr-2 h-5 w-5" /> }
  ];

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-whatsapp text-white">
          <h2 className="font-semibold text-lg">Dashboard</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-2 text-left rounded-md ${
                    activeTab === tab.id 
                      ? 'bg-whatsapp-light text-whatsapp font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
