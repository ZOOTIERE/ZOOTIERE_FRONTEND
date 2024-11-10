import React from 'react';
import { User, Tag, Calendar, Home, Heart, CircleDollarSign } from 'lucide-react';
import { AnimalData } from '../../types/global';



export const DetailAnimal = () => {
  // Datos de ejemplo - estos deberían venir de tu backend
  const animalData: AnimalData = {
    id_animal: 1,
    name: "Bonita",
    marca: "BT-001",
    species: 1,
    date_of_birth: "2020-05-15",
    state: "Vivo",
    sex: "H",
    id_user: 123,
    id_father: 45,
    id_mother: 32,
    id_race: 2,
    id_finca: 1
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const getStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'vivo':
        return 'bg-green-100 text-green-800';
      case 'muerto':
        return 'bg-red-100 text-red-800';
      case 'vendido':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSexLabel = (sex: string) => {
    return sex === 'H' ? 'Hembra' : sex === 'M' ? 'Macho' : 'No especificado';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Encabezado */}
        <div className="bg-green-50 p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-green-800">{animalData.name}</h2>
              <p className="text-green-600">ID: {animalData.id_animal}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStateColor(animalData.state)}`}>
              {animalData.state}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Información Básica</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Marca</p>
                  <p className="font-medium">{animalData.marca}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Especie</p>
                  <p className="font-medium">{animalData.species}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sexo</p>
                  <p className="font-medium">{getSexLabel(animalData.sex)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Raza</p>
                  <p className="font-medium">{animalData.id_race}</p>
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
          </div>

          {/* Genealogía */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Genealogía</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {animalData.id_father && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600">Padre</p>
                  <p className="font-medium text-blue-800">ID: {animalData.id_father}</p>
                </div>
              )}
              {animalData.id_mother && (
                <div className="p-4 bg-pink-50 rounded-lg">
                  <p className="text-sm text-pink-600">Madre</p>
                  <p className="font-medium text-pink-800">ID: {animalData.id_mother}</p>
                </div>
              )}
            </div>
          </div>

          {/* Ubicación y Responsable */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Ubicación y Responsable</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Finca</p>
                <p className="font-medium text-gray-800">ID: {animalData.id_finca}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Usuario Responsable</p>
                <p className="font-medium text-gray-800">ID: {animalData.id_user}</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
