import React, { useState } from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RazasForm } from '../../types/global';
import { AnimalService } from '../../api';
import { toast } from 'react-toastify';

export const RegisterRazas = () => {
  const [formData, setFormData] = useState<RazasForm>({
    name_race: '',
    description: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      // Validación básica
      if (!formData.name_race.trim()) {
        throw new Error('Por favor ingrese el nombre de la raza');
      }
      if (!formData.description.trim()) {
        throw new Error('Por favor ingrese una descripción');
      }

      const response = await AnimalService.createRazas(formData);
      
      if (response.status === 201 || response.status === 200) {
        toast.success('Raza registrada correctamente');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar la raza';
      setError(errorMessage);
      toast.error(errorMessage,);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <h2 className="text-2xl font-bold text-gray-900">Registrar Nueva Raza</h2>
          <p className="mt-1 text-sm text-green-600">Ingrese los detalles de la nueva raza</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name_race" className="block text-sm font-medium text-gray-700">
              Nombre de la Raza *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="text"
                name="name_race"
                id="name_race"
                required
                placeholder="Ej: Holstein, Jersey, Angus"
                className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={formData.name_race}
                onChange={handleChange}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Ingrese el nombre oficial de la raza
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText className="h-5 w-5 text-green-500" />
              </div>
              <textarea
                name="description"
                id="description"
                required
                rows={4}
                placeholder="Describa las características principales de la raza..."
                className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Proporcione una descripción detallada de las características de la raza
            </p>
          </div>

          <div className="flex justify-end space-x-4 pt-4">

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              } py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Raza'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
