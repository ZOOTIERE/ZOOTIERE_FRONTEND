import React, { useState, useEffect } from 'react';
import { Syringe } from 'lucide-react';
import { VacunaFormData } from '../../types/global';
import { VacunaService, AnimalService } from '../../api';
import { toast } from 'react-toastify';

interface Animal {
  id: number;
  name: string;
}

export const RegisterVacuna = () => {
  const [formData, setFormData] = useState<VacunaFormData>({
    animal: 0,
    fecha_aplicacion: '',
    tipo_vacuna: '',
    dosis: ''
  });
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await AnimalService.getAllAnimals();
        setAnimals(data);
      } catch (err) {
        toast.error('Error al cargar los animales');
      }
    };

    fetchAnimals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Validaciones básicas
      if (!formData.animal) {
        throw new Error('Por favor seleccione un animal');
      }
      if (!formData.fecha_aplicacion) {
        throw new Error('Por favor ingrese la fecha de aplicación');
      }
      if (!formData.tipo_vacuna.trim()) {
        throw new Error('Por favor ingrese el tipo de vacuna');
      }
      if (!formData.dosis.trim()) {
        throw new Error('Por favor ingrese la dosis');
      }

      const response = await VacunaService.createVacuna(formData);
      if (response.status === 201 || response.status === 200) {
        toast.success('Vacuna registrada correctamente');
        // Limpiar formulario
        setFormData({
          animal: 0,
          fecha_aplicacion: '',
          tipo_vacuna: '',
          dosis: ''
        });
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar la vacuna');
      toast.error('Error al registrar la vacuna');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'animal' ? parseInt(value) : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Registrar Nueva Vacuna</h2>
          <p className="mt-1 text-sm text-green-600">Ingrese los datos de la vacuna aplicada</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="animal" className="block text-sm font-medium text-gray-700">
              Animal *
            </label>
            <select
              name="animal"
              id="animal"
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              value={formData.animal}
              onChange={handleChange}
            >
              <option value="">Seleccione un animal</option>
              {animals.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="fecha_aplicacion" className="block text-sm font-medium text-gray-700">
              Fecha de Aplicación *
            </label>
            <input
              type="date"
              name="fecha_aplicacion"
              id="fecha_aplicacion"
              required
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={formData.fecha_aplicacion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="tipo_vacuna" className="block text-sm font-medium text-gray-700">
              Tipo de Vacuna *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Syringe className="h-5 w-5 text-green-500" />
              </div>
              <input
                type="text"
                name="tipo_vacuna"
                id="tipo_vacuna"
                required
                placeholder="Ej: Antirrábica, Triple"
                className="pl-10 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={formData.tipo_vacuna}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="dosis" className="block text-sm font-medium text-gray-700">
              Dosis *
            </label>
            <input
              type="text"
              name="dosis"
              id="dosis"
              required
              placeholder="Ej: 2ml"
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={formData.dosis}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="submit"
              className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Registrar Vacuna
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};