import React from 'react';
import { CardProps } from '../../types/components';
import { useNavigate } from 'react-router-dom';

export const Card: React.FC<CardProps> = ({ id, titulo, subtitulo, imagenUrl, type }) => {
  const navigate = useNavigate();

  const handleFincaDetail = (id: number) => {
    navigate(`/${type}/${id}`);
  }
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-64 h-64 text-center shadow-lg m-4">
      <img src={imagenUrl} alt={titulo} className="w-full h-36 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-4 mb-2">{titulo}</h2>
      <p className="text-sm text-gray-600 mb-4">{subtitulo}</p>
      <button onClick={() => handleFincaDetail(id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Ver más
      </button>
    </div>
  );
};

export const AddCard: React.FC<{ type: string }> = ({ type }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/register-${type}`);
  }
  return (
    <div onClick={handleClick} className="border border-gray-300 rounded-lg p-4 w-64 h-64 text-center shadow-lg m-4 flex items-center justify-center">
      <button className="text-4xl text-green-400 hover:text-gray-500 transition-colors">+</button>
    </div>
  );
};
