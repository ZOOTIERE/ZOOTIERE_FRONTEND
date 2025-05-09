import React, { useEffect, useState } from 'react';
import { Home, Users, Map, Beef, Wheat } from 'lucide-react';
import { FincaData, Animal } from '../../types/global';
import { FincaService, AnimalService } from '../../api';
import { useParams, Link } from 'react-router-dom';

export const DetailFinca = () => {
  const { id } = useParams<{ id: string }>();
  const [fincaData, setFincaData] = useState<FincaData | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAnimals, setLoadingAnimals] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  // Eliminado el estado para filtrado de animales

  useEffect(() => {
    const fetchFinca = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await FincaService.getFincaDetail(id as string);
        console.log(response.data);
        setFincaData(response.data);
      } catch (err) {
        setError('Error al cargar la información de la finca');
      } finally {
        setLoading(false);
      }
    };

    const fetchAnimals = async () => {
      try {
        setLoadingAnimals(true);
        // Asumiendo que hay un método para obtener animales por ID de finca
        const response = await AnimalService.getAnimalsByFinca(id as string);
        setAnimals(response.data);
      } catch (err) {
        console.error('Error al cargar los animales de la finca');
      } finally {
        setLoadingAnimals(false);
      }
    };

    fetchFinca();
    fetchAnimals();
  }, [id]);

  // No hay filtrado de animales
  const filteredAnimals = animals;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-red-50 p-6 rounded-lg text-red-700">
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Eliminada función para calcular edad

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Cabecera de la finca */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{fincaData?.name}</h1>
              <p className="text-green-100 flex items-center">
                <Map className="h-4 w-4 mr-1" /> {fincaData?.address}
              </p>
            </div>
            <div className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium">
              {fincaData?.category}
            </div>
          </div>
        </div>
        
        {/* No hay descripción de la finca */}

        {/* Estadísticas principales */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600">Trabajadores</p>
                  <p className="text-xl font-bold text-blue-800">{fincaData?.employees}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Map className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600">Hectáreas</p>
                  <p className="text-xl font-bold text-green-800">{fincaData?.hectares}</p>
                </div>
              </div>
            </div>

            {fincaData?.category === 'Mixta' || fincaData?.category === 'Agricola' ? (
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wheat className="h-8 w-8 text-amber-600" />
                  <div>
                    <p className="text-sm text-amber-600">H. Cultivos</p>
                    <p className="text-xl font-bold text-amber-800">{fincaData?.cropsHectares}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {fincaData?.category === 'Mixta' || fincaData?.category === 'Ganadera' ? (
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Beef className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-600">H. Ganadería</p>
                    <p className="text-xl font-bold text-purple-800">{fincaData?.livestockHectares}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Sección de Animales */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Animales de la Finca</h2>
          <Link 
            to={`/register-animal?fincaId=${id}`}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Añadir Animal
          </Link>
        </div>

        {/* No se muestra filtro de animales */}

        {/* Lista de animales */}
        <div className="p-6">
          {loadingAnimals ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredAnimals && filteredAnimals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAnimals.map(animal => (
                <Link 
                  to={`/animals/${animal.id}`} 
                  key={animal.id}
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Beef className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{animal.name}</h3>
                      <p className="text-sm text-gray-500">{animal.species}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Beef className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No hay animales registrados en esta finca</p>
              <p className="text-sm mt-1">Añade tu primer animal usando el botón en la parte superior</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};