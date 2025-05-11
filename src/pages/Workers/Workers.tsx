
import { FC, useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { WorkerData } from '../../types/global';
import { AddCard, Card } from '../../components/Card/Card';
import { WorkersServices } from '../../services/workers.service';

export const Workers: FC = () => {
  const [workers, setWorkers] = useState<WorkerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  

  
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        setError('');
        const r:any = WorkersServices.listWorkers();
        setWorkers(r);        
      } catch (err) {
        setError('Error al cargar los trabajadores');
        setLoading(false);
      }
    };
    
    fetchWorkers();
  }, []);
  

  
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Trabajadores</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar trabajador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 w-64"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <Filter size={18} />
              Filtrar
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">Cargando trabajadores...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {workers.length === 0 && searchTerm === '' ? (
              <AddCard type="worker" />
            ) : workers.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-center h-64">
                <p className="text-lg text-gray-600 mb-4">No se encontraron trabajadores que coincidan con tu búsqueda</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              <>
                {workers.map((worker) => (
                  <Card
                    key={worker.id}
                    id={worker.id}
                    titulo={worker.name}
                    subtitulo={`${worker.rol}`}
                    type="workers"
                  />
                ))}
                <AddCard type="workers" />
              </>
            )}
          </div>
        )}
        
        {!loading && !error && workers.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen de personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-gray-600">Total trabajadores</p>
                <p className="text-2xl font-bold">{workers.length}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Fincas con personal</p>
                <p className="text-2xl font-bold">{new Set(workers.map(w => w.fincaId)).size}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Roles diferentes</p>
                <p className="text-2xl font-bold">{new Set(workers.map(w => w.rol)).size}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Último registro</p>
                <p className="text-2xl font-bold">Hoy</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};