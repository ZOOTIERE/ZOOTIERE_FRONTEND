import React, { useEffect, useState } from 'react';
import { Tag, Calendar, Home, Heart } from 'lucide-react';
import { AnimalData } from '../../types/global';
import { useParams } from 'react-router-dom';
import { AnimalService } from '../../api';

export const DetailAnimal = () => {
  const { id } = useParams<{ id: string }>();
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await AnimalService.getAnimalById(Number(id));
        setAnimalData(response);
      } catch (err) {
        setError('Error al cargar los datos del animal');
      } finally {
        setLoading(false);
      }
    };
    fetchAnimal();
  }, []);

  const formatDate = (date: string | null) => {
    if (!date) return 'No especificado';
    return new Date(date).toLocaleDateString();
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : animalData && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-green-50 p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-green-800">
                  {animalData.name || 'Sin nombre'}
                </h2>
                <p className="text-green-600">ID: {animalData.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium `}>
                {animalData.state || 'No especificado'}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Información Básica</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Marca</p>
                    <p className="font-medium">{animalData.marca || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Especie</p>
                    <p className="font-medium">{animalData.species}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sexo</p>
                    <p className="font-medium">{animalData.sex}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Raza</p>
                    <p className="font-medium">{animalData.id_race || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Fechas</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                    <p className="font-medium">{formatDate(animalData.date_of_birth)}</p>
                  </div>
                  {animalData.date_of_death && (
                    <div>
                      <p className="text-sm text-gray-500">Fecha de Muerte</p>
                      <p className="font-medium">{formatDate(animalData.date_of_death)}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Información de la Finca</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID Finca</p>
                    <p className="font-medium">{animalData.id_finca || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID Usuario</p>
                    <p className="font-medium">{animalData.id_user || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Información Genealógica</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID Padre</p>
                    <p className="font-medium">{animalData.id_father || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID Madre</p>
                    <p className="font-medium">{animalData.id_mother || 'No especificado'}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
