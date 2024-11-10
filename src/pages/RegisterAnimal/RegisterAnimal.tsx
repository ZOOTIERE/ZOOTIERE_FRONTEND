import React, { useState } from 'react';
import { User, Tag, Calendar, Home, Heart } from 'lucide-react';
import { AnimalFormData } from '../../types/global';



export const RegisterAnimal = () => {
  const [formData, setFormData] = useState<AnimalFormData>({
    name: '',
    marca: '',
    species: 0,
    date_of_birth: '',
    state: 'Vivo',
    sex: '',
    id_user: 0,
    id_race: 0,
    id_finca: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica para enviar los datos al backend
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Encabezado */}
        <div className="bg-green-50 p-6 border-b">
          <h2 className="text-2xl font-bold text-green-800">Registro de Animal</h2>
          <p className="text-green-600">Ingrese los datos del animal</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Información Básica</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Marca</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Especie</label>
                  <input
                    type="number"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Fechas</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Muerte (opcional)</label>
                  <input
                    type="date"
                    name="date_of_death"
                    value={formData.date_of_death || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Estado y Sexo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
              >
                <option value="Vivo">Vivo</option>
                <option value="Muerto">Muerto</option>
                <option value="Vendido">Vendido</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sexo</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
              >
                <option value="">Seleccione...</option>
                <option value="M">Macho</option>
                <option value="H">Hembra</option>
              </select>
            </div>
          </div>

          {/* Relaciones */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Relaciones</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Padre</label>
                <input
                  type="number"
                  name="id_father"
                  value={formData.id_father || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">ID Madre</label>
                <input
                  type="number"
                  name="id_mother"
                  value={formData.id_mother || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Raza</label>
                <input
                  type="number"
                  name="id_race"
                  value={formData.id_race}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                />
              </div>
            </div>
          </div>

          {/* IDs de Usuario y Finca */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuario Responsable</label>
              <input
                type="number"
                name="id_user"
                value={formData.id_user}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Finca</label>
              <input
                type="number"
                name="id_finca"
                value={formData.id_finca}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Guardar Animal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
