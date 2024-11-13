import React, { useState, useEffect } from 'react';
import { Tag, Calendar, Home, Heart } from 'lucide-react';
import { AnimalFormData, FincaData } from '../../types/global';
import { AnimalService, FincaService } from '../../api';
import { useNavigate } from 'react-router-dom';

interface Especie {
  id: number;
  species_name: string;
}

interface Raza {
  id: number;
  name_race: string;
}

interface Finca {
  id: number;
  name: string;
}

export const RegisterAnimal = () => {
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [razas, setRazas] = useState<Raza[]>([]);
  const [fincas, setFincas] = useState<Finca[]>([]);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<AnimalFormData>({
    name: '',
    marca: '',
    species: 0,
    date_of_birth: '',
    state: 'Vivo',
    sex: '',
    id_user: parseInt(JSON.parse(localStorage.getItem('data') || '{}')?.user?.id || '0'),
    id_race: 0,
    id_finca: 0
  });

  const [showParents, setShowParents] = useState(false);
  const [knowsBirthDate, setKnowsBirthDate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [especiesData, razasData, fincasData] = await Promise.all([
          AnimalService.getAllEspecies(),
          AnimalService.getAllRazas(),
          FincaService.getAllFincas() // Asumiendo que existe este método
        ]);

        setEspecies(especiesData);

        setRazas(razasData);
  
        setFincas(fincasData.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AnimalService.createAnimal(formData);
      if (response.status === 201 || response.status === 200) {
        navigate("/vacas");
      }
      // Aquí puedes agregar la lógica de navegación o mensaje de éxito
    } catch (error) {
      console.error('Error al registrar animal:', error);
      // Aquí puedes agregar la lógica de manejo de errores
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Encabezado se mantiene igual */}
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
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                  >
                    <option value="">Seleccione una especie...</option>
                    {especies.map(especie => (
                      <option key={especie.id} value={especie.id}>
                        {especie.species_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* La sección de fechas se mantiene igual */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Fechas</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="knowsBirthDate"
                    checked={knowsBirthDate}
                    onChange={(e) => setKnowsBirthDate(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="knowsBirthDate" className="text-sm font-medium text-gray-700">
                    ¿Conoce la fecha de nacimiento?
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {knowsBirthDate ? 'Fecha de Nacimiento' : 'Fecha de Adquisición'}
                  </label>
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

          {/* Sección de padres */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="showParents"
              checked={showParents}
              onChange={(e) => setShowParents(e.target.checked)}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="showParents" className="text-sm font-medium text-gray-700">
              ¿Conoce los padres?
            </label>
          </div>

          {showParents && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Relaciones</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </div>
          )}

          {/* Raza y Finca */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Raza</label>
              <select
                name="id_race"
                value={formData.id_race}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
              >
                <option value="">Seleccione una raza...</option>
                {razas.map(raza => (
                  <option key={raza.id} value={raza.id}>
                    {raza.name_race}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Finca</label>
              <select
                name="id_finca"
                value={formData.id_finca}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
              >
                <option value="">Seleccione una finca...</option>
                {fincas.map(finca => (
                  <option key={finca.id} value={finca.id}>
                    {finca.name}
                  </option>
                ))}
              </select>
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