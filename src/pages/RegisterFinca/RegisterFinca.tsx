import React, { useState } from 'react';
import { Home, Users, MapPin, Triangle, BadgeDollarSign } from 'lucide-react';
import { FincaFormData } from '../../types/global';
import { FincaService } from '../../api';
import { useNavigate } from 'react-router-dom';



export const RegisterFinca = () => {
  const [formData, setFormData] = useState<FincaFormData>({
    name: '',
    address_finca: '',
    num_trabajadores: 0,
    hectareas: 0,
    num_vacas: 0,
    num_crias: 0,
    especialidad: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Validaciones básicas
      if (!formData.name || !formData.address_finca || !formData.especialidad) {
        throw new Error('Por favor complete todos los campos obligatorios');
      }

      if (formData.num_trabajadores < 0 || formData.hectareas < 0 || 
          formData.num_vacas < 0 || formData.num_crias < 0) {
        throw new Error('Los valores numéricos no pueden ser negativos');
      }

      const response = await FincaService.createFinca(formData);
      if (response.status === 200 || response.status === 201) {
        navigate('/fincas');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la finca');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value
    }));
  };

  const especialidades = [
    'Lechera',
    'Cárnica',
    'Mixta',
    'Cría',
    'Engorde'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Registrar Nueva Finca</h2>
          <p className="mt-1 text-sm text-green-600">Complete la información de la nueva finca</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Nombre de la Finca */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre de la Finca *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Home className="h-5 w-5 text-green-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Dirección */}
            <div>
              <label htmlFor="address_finca" className="block text-sm font-medium text-gray-700">
                Dirección *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-green-500" />
                </div>
                <input
                  type="text"
                  name="address_finca"
                  id="address_finca"
                  required
                  className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.address_finca}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Número de Trabajadores */}
            <div>
              <label htmlFor="num_trabajadores" className="block text-sm font-medium text-gray-700">
                Número de Trabajadores
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
                <input
                  type="number"
                  name="num_trabajadores"
                  id="num_trabajadores"
                  min="0"
                  className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.num_trabajadores}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Hectáreas */}
            <div>
              <label htmlFor="hectareas" className="block text-sm font-medium text-gray-700">
                Hectáreas
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Triangle className="h-5 w-5 text-green-500" />
                </div>
                <input
                  type="number"
                  name="hectareas"
                  id="hectareas"
                  placeholder='0'
                  step="1"
                  className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.hectareas}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Número de Vacas */}
            <div>
              <label htmlFor="num_vacas" className="block text-sm font-medium text-gray-700">
                Número de Vacas
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BadgeDollarSign className="h-5 w-5 text-green-500" />
                </div>
                <input
                  type="number"
                  name="num_vacas"
                  id="num_vacas"
                  min="0"
                  className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.num_vacas}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Número de Crías */}
            <div>
              <label htmlFor="num_crias" className="block text-sm font-medium text-gray-700">
                Número de Crías
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BadgeDollarSign className="h-5 w-5 text-green-500" />
                </div>
                <input
                  type="number"
                  name="num_crias"
                  id="num_crias"
                  min="0"
                  className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.num_crias}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Especialidad */}
            <div>
              <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700">
                Especialidad *
              </label>
              <select
                name="especialidad"
                id="especialidad"
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                value={formData.especialidad}
                onChange={handleChange}
              >
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Guardar Finca
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
