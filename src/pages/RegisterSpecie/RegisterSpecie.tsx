import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';
import { SpeciesForm } from '../../types/global';
import { AnimalService } from '../../api';
import { toast } from 'react-toastify';


export const RegisterSpecies = () => {
  const [formData, setFormData] = useState<SpeciesForm>({
    species_name: ''
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Validación básica
      if (!formData.species_name.trim()) {
        throw new Error('Por favor ingrese el nombre de la especie');
      }

      const response = await AnimalService.createSpecies(formData);
      if (response.status === 201 || response.status === 200) {
        toast.success('Especie registrada correctamente');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la especie');
      toast.error('Error al registrar la especie');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Registrar Nueva Especie</h2>
          <p className="mt-1 text-sm text-green-600">Ingrese el nombre de la nueva especie animal</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="species_name" className="block text-sm font-medium text-gray-700">
              Nombre de la Especie *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PawPrint className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="text"
                name="species_name"
                id="species_name"
                required
                placeholder="Ej: Bovino, Ovino, Caprino"
                className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={formData.species_name}
                onChange={handleChange}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Ingrese el nombre científico o común de la especie
            </p>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="submit"
              className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Guardar Especie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

