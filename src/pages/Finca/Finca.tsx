import React, { useEffect, useState } from 'react';
import { AddCard, Card } from '../../components/Card/Card';
import { FincaService } from '../../api';
import { FincaData } from '../../types/global';
import defaultFinca from '../../assets/imgs/image.png';
import { getUserDataFromLocalStorage } from '../../utils/getUserData';



export const Finca: React.FC = () => {
  const [fincas, setFincas] = useState<FincaData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFincas = async () => {
      try {
        setLoading(true);
        setError('');
        const id = getUserDataFromLocalStorage()?.id as string;
        const response = await FincaService.getFincaID(id);
        console.log(response.data);
        setFincas(response.data); // Supongo que `response` contiene un array de fincas
      } catch (err) {
        setError('Error al cargar las fincas');
      } finally {
        setLoading(false);
      }
    };
    console.log(fincas);
    fetchFincas();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fincas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap">
          {fincas.length === 0 ? (
            <AddCard type="finca" />
          ) : (
            <>
              {fincas.map((finca, index) => (
                <Card
                  key={index}
                  id={finca.id}
                  titulo={finca.name || `Finca ${index + 1}`}
                  subtitulo={`Especialidad: ${finca.category || 'Desconocida'}`}
                  imagenUrl={defaultFinca} // Ajusta `imageUrl` según tu API
                  type='fincas'
                />
              ))}
              <AddCard type="farm" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
