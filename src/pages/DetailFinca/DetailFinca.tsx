import React, { useEffect, useState } from 'react';
import { Home, Users, Map, Heart } from 'lucide-react';
import { FincaData } from '../../types/global';
import { FincaService } from '../../api';
import { useParams } from 'react-router-dom';


export const DetailFinca = () => {
  // Datos de ejemplo - estos deberían venir de tu backend
  const { id } = useParams<{ id: string }>();
  const [fincaData, setFincaData] = React.useState<FincaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFincas = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await FincaService.getFincaID(Number(id));
        setFincaData(response.data); // Supongo que `response` contiene un array de fincas
      } catch (err) {
        setError('Error al cargar las fincas');
      } finally {
        setLoading(false);
      }
    };
    fetchFincas();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-50 p-6">
          <h1 className="text-2xl font-bold text-green-800">
            {fincaData?.name}
          </h1>
          <p className="text-green-600">ID: {fincaData?.id}</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información General */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Información General</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Dirección:</span> {fincaData?.address_finca}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Especialidad:</span> {fincaData?.especialidad}
                </p>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600">Trabajadores</p>
                    <p className="text-xl font-bold text-blue-800">{fincaData?.num_trabajadores}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Map className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600">Hectáreas</p>
                    <p className="text-xl font-bold text-green-800">{fincaData?.hectareas}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Home className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-600">Vacas</p>
                    <p className="text-xl font-bold text-purple-800">{fincaData?.num_vacas}</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="h-8 w-8 text-pink-600" />
                  <div>
                    <p className="text-sm text-pink-600">Crías</p>
                    <p className="text-xl font-bold text-pink-800">{fincaData?.num_crias}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
