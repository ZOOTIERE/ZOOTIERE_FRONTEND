import React, { useEffect, useState } from 'react';
import { AddCard, Card } from '../../components/Card/Card';
import { AnimalService } from '../../api';
import { AnimalData } from '../../types/global';
import defaultVaca from '../../assets/imgs/vaca.png';
// Define el tipo de datos para un animal


export const Vacas: React.FC = () => {
  const [animales, setAnimales] = useState<AnimalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await AnimalService.getAllAnimals();
        setAnimales(response); // Supongo que `response` contiene un array de animales
      } catch (err) {
        setError('Error al cargar los animales');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimales();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vacas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap">
          {animales.length === 0 ? (
            <AddCard type="animal" />
          ) : (
            <>
              {animales.map((animal, index) => (
                <Card
                  id={animal.id}
                  key={index}
                  titulo={animal.marca || `Animal ${index + 1}`}
                  subtitulo={animal.name || 'Desconocido'}
                  imagenUrl={defaultVaca} // Ajusta `imagenUrl` según tu API
                />
              ))}
              <AddCard type="animal" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
