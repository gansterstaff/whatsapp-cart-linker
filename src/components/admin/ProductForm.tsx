
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';

interface ProductFormProps {
  productForm: {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    featured: boolean;
    category: string;
  };
  editingProduct: any;
  handleProductFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSaveProduct: () => void;
  handleCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  productForm,
  editingProduct,
  handleProductFormChange,
  handleSaveProduct,
  handleCancel
}) => {
  return (
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
          onClick={handleCancel}
        >
          <X className="mr-2 h-4 w-4" /> Cancelar
        </Button>
        <Button
          onClick={handleSaveProduct}
          className="bg-whatsapp hover:bg-whatsapp-dark text-white"
        >
          <Save className="mr-2 h-4 w-4" /> Guardar
        </Button>
      </div>
    </div>
  );
};
