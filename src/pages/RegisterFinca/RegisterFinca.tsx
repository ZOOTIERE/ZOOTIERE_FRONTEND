import { FC, useState, useEffect } from 'react';
import { Home, MapPin, Users, LayoutGrid, Wheat, Beef, CheckCircle } from 'lucide-react';
import { getUserDataFromLocalStorage } from '../../utils/getUserData';
import { FincaService } from '../../api';
import { FincaFormData } from '../../types/global';
import { useNavigate } from 'react-router-dom';


export const RegisterFinca: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<FincaFormData, 'userId'>>({
    name: '',
    address: '',
    category: 'Ganadera',
    employees: 1,
    hectares: 0,
    cropsHectares: 0,
    livestockHectares: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (formData.category === 'Ganadera') {
      setFormData(prev => ({
        ...prev,
        livestockHectares: prev.hectares,
        cropsHectares: 0
      }));
    } else if (formData.category === 'Agricola') {
      setFormData(prev => ({
        ...prev,
        cropsHectares: prev.hectares,
        livestockHectares: 0
      }));
    }
  }, [formData.category, formData.hectares]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert to number for numeric fields
    if (['employees', 'hectares', 'cropsHectares', 'livestockHectares'].includes(name)) {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would get the userId from authentication context
    const userId = getUserDataFromLocalStorage()?.id as string; // Placeholder
    
    setIsSubmitting(true);
    
    try {
      
      const completeData: FincaFormData = {
        ...formData,
        userId
      };
      
      const response = await FincaService.createFinca(completeData);
      console.log('Finca created:', response.data);
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedirect = () => {
    navigate('/fincas'); 
  }

  if (isSuccess) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Finca creada con éxito!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ya puedes comenzar a gestionar "{formData.name}" y aprovechar todas las herramientas de Zootiere.
            </p>
            <button onClick={handleRedirect} className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-600">
              Ir al Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Crea tu <span className="text-green-600">Finca</span>
          </h1>
          <p className="text-xl text-gray-600">
            Comienza a gestionar tus recursos de manera inteligente
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Home size={20} className="mr-2 text-green-600" />
                Nombre de la Finca
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ej: Hacienda El Paraíso"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <MapPin size={20} className="mr-2 text-green-600" />
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ej: Km 5 Vía Principal, Municipio"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <LayoutGrid size={20} className="mr-2 text-green-600" />
                Categoría
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="Ganadera">Ganadera</option>
                <option value="Agricola">Agrícola</option>
                <option value="Mixta">Mixta</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Users size={20} className="mr-2 text-green-600" />
                  Trabajadores
                </label>
                <input
                  type="number"
                  name="employees"
                  value={formData.employees}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <LayoutGrid size={20} className="mr-2 text-green-600" />
                  Hectáreas Totales
                </label>
                <input
                  type="number"
                  name="hectares"
                  value={formData.hectares}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
            </div>
            
            {formData.category === 'Mixta' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <Wheat size={20} className="mr-2 text-green-600" />
                    Hectáreas para Cultivos
                  </label>
                  <input
                    type="number"
                    name="cropsHectares"
                    value={formData.cropsHectares}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <Beef size={20} className="mr-2 text-green-600" />
                    Hectáreas para Ganadería
                  </label>
                  <input
                    type="number"
                    name="livestockHectares"
                    value={formData.livestockHectares}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span> 
                    Creando...
                  </>
                ) : (
                  'Crear Finca'
                )}
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};