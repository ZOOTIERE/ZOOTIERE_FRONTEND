import { FC, useState, useEffect } from 'react';
import { Heart, Calendar, Dna, Home, Users, CheckCircle } from 'lucide-react';
import { getUserDataFromLocalStorage } from '../../utils/getUserData';
import { AnimalService, FincaService } from '../../api';
import { CreateAnimalDTO } from '../../types/global';
import { useNavigate } from 'react-router-dom';

interface Finca {
  id: string;
  name: string;
}

interface Animal {
  id: string;
  name: string;
  species: string;
}

export const RegisterAnimal: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<CreateAnimalDTO, 'fincaId'>>({
    name: '',
    species: 'Bovino',
    breed: '',
    birthDate: new Date(),
    fatherId: null,
    motherId: null
  });
  
  const [fincas, setFincas] = useState<Finca[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedFincaId, setSelectedFincaId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Especies y razas disponibles
  const speciesBreeds = {
    'Bovino': ['Holstein', 'Angus', 'Brahman', 'Charolais', 'Simmental', 'Cebú', 'Normando'],
    'Porcino': ['Yorkshire', 'Landrace', 'Duroc', 'Hampshire', 'Pietrain', 'Large White'],
    'Ovino': ['Dorper', 'Santa Inés', 'Morada Nova', 'Pelibuey', 'Romney Marsh'],
    'Caprino': ['Boer', 'Anglo Nubian', 'Saanen', 'Toggenburg', 'La Mancha'],
    'Equino': ['Criollo', 'Árabe', 'Cuarto de Milla', 'Pura Sangre', 'Paso Fino']
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedFincaId) {
      loadAnimalsFromFinca(selectedFincaId);
    }
  }, [selectedFincaId]);

  const loadInitialData = async () => {
    try {
      const userId = getUserDataFromLocalStorage()?.id as string;
      // Cargar fincas del usuario
      const fincasResponse = await FincaService.getFincaID(userId);
      setFincas(fincasResponse.data);
      
      if (fincasResponse.data.length > 0) {
        setSelectedFincaId(fincasResponse.data[0].id);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Modificar la función loadAnimalsFromFinca para mayor robustez
const loadAnimalsFromFinca = async (fincaId: string) => {
  try {
    const animalsResponse = await AnimalService.getAnimalsByFinca(fincaId);
    // Asegurarse de que la respuesta tenga data y sea un array
    const animalsData = animalsResponse?.data ?? [];
    setAnimals(Array.isArray(animalsData) ? animalsData : []);
  } catch (error) {
    console.error('Error loading animals:', error);
    setAnimals([]);
  }
};


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'birthDate') {
      setFormData({
        ...formData,
        [name]: new Date(value)
      });
    } else if (name === 'fatherId' || name === 'motherId') {
      setFormData({
        ...formData,
        [name]: value === '' ? null : value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFincaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFincaId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFincaId) {
      alert('Por favor selecciona una finca');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const completeData: CreateAnimalDTO = {
        ...formData,
        fincaId: selectedFincaId
      };
      
      const response = await AnimalService.createAnimal(completeData);
      console.log('Animal created:', response.data);
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedirect = () => {
    navigate('/animals'); 
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

// Función getFilteredAnimals más segura
const getFilteredAnimals = (): Animal[] => {
  try {
    if (!Array.isArray(animals)) {
      return [];
    }
    return animals.filter(animal => 
      animal?.species === formData.species
    );
  } catch (error) {
    console.error('Error filtering animals:', error);
    return [];
  }
};

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="animate-spin text-green-500">⟳</div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
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
              ¡Animal registrado con éxito!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              "{formData.name}" ha sido agregado a tu finca y ya puedes comenzar a gestionar su información.
            </p>
            <button onClick={handleRedirect} className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-600">
              Ir a Animales
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
            Registra tu <span className="text-green-600">Animal</span>
          </h1>
          <p className="text-xl text-gray-600">
            Agrega un nuevo miembro a tu rebaño
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Selección de Finca */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Home size={20} className="mr-2 text-green-600" />
                Finca
              </label>
              <select
                value={selectedFincaId}
                onChange={handleFincaChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona una finca</option>
                {fincas.map((finca) => (
                  <option key={finca.id} value={finca.id}>
                    {finca.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Nombre del Animal */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Heart size={20} className="mr-2 text-green-600" />
                Nombre del Animal
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ej: Esperanza, Torito, Luna"
                required
              />
            </div>
            
            {/* Especie y Raza */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Dna size={20} className="mr-2 text-green-600" />
                  Especie
                </label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  {Object.keys(speciesBreeds).map((species) => (
                    <option key={species} value={species}>
                      {species}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Dna size={20} className="mr-2 text-green-600" />
                  Raza
                </label>
                <select
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona una raza</option>
                  {speciesBreeds[formData.species as keyof typeof speciesBreeds]?.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fecha de Nacimiento */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Calendar size={20} className="mr-2 text-green-600" />
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="birthDate"
                value={formatDateForInput(formData.birthDate)}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            {/* Padre y Madre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Users size={20} className="mr-2 text-green-600" />
                  Padre (Opcional)
                </label>
                <select
                  name="fatherId"
                  value={formData.fatherId || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Sin padre registrado</option>
                  {getFilteredAnimals().map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Users size={20} className="mr-2 text-green-600" />
                  Madre (Opcional)
                </label>
                <select
                  name="motherId"
                  value={formData.motherId || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Sin madre registrada</option>
                  {getFilteredAnimals().map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span> 
                    Registrando...
                  </>
                ) : (
                  'Registrar Animal'
                )}
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};