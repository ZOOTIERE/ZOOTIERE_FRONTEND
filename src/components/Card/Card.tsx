import React from 'react';
import { CardProps } from '../../types/components';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';

export const Card: React.FC<CardProps> = ({ id, titulo, subtitulo, type }) => {
  const navigate = useNavigate();
  
  const handleFincaDetail = (id: string) => {
    navigate(`/${type}/${id}`);
  }
  
  // Determinar un color de fondo basado en el tipo
  const getBgColor = () => {
    switch (type) {
      case 'farms':
        return 'from-green-100 to-green-50';
      case 'animals':
        return 'from-blue-100 to-blue-50';
      case 'workers':
        return 'from-amber-100 to-amber-50';
      case 'vaccines':
        return 'from-purple-100 to-purple-50';
      case 'feed':
        return 'from-orange-100 to-orange-50';
      default:
        return 'from-gray-100 to-gray-50';
    }
  }
  
  return (
    <div className={`rounded-xl p-6 w-64 h-64 shadow-md m-4 flex flex-col justify-between bg-gradient-to-br ${getBgColor()} border border-gray-100 transition-transform hover:scale-105 hover:shadow-lg`}>
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{titulo}</h2>
        <p className="text-sm text-gray-600">{subtitulo}</p>
      </div>
      
      <button 
        onClick={() => handleFincaDetail(id)} 
        className="mt-4 w-full py-2 bg-white text-green-600 border border-green-500 rounded-lg flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition-colors group font-medium"
      >
        Ver detalles
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export const AddCard: React.FC<{ type: string }> = ({ type }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/register-${type}`);
  }
  
  // Título y subtítulo dinámicos según el tipo
  const getCardTitle = () => {
    switch (type) {
      case 'farm':
        return { title: 'Nueva Finca', subtitle: 'Añadir una nueva propiedad' };
      case 'animal':
        return { title: 'Nuevo Animal', subtitle: 'Registrar ganado' };
      case 'worker':
        return { title: 'Nuevo Trabajador', subtitle: 'Añadir personal' };
      case 'vaccine':
        return { title: 'Nueva Vacuna', subtitle: 'Registrar tratamiento' };
      case 'feed':
        return { title: 'Nueva Alimentación', subtitle: 'Registrar alimentación' };
      default:
        return { title: 'Añadir Nuevo', subtitle: 'Crear nuevo registro' };
    }
  }
  
  const { title, subtitle } = getCardTitle();
  
  return (
    <div 
      onClick={handleClick} 
      className="rounded-xl p-6 w-64 h-64 shadow-md m-4 flex flex-col justify-between bg-white border border-dashed border-green-300 transition-all hover:border-green-500 hover:shadow-lg cursor-pointer"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      
      <div className="mt-4 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <Plus size={24} className="text-green-500" />
        </div>
      </div>
    </div>
  );
};