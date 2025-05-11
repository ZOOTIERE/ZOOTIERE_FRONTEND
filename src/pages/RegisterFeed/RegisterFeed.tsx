import { FC, useState } from 'react';
import { Calendar, Scale, Layers } from 'lucide-react';
import { FeedForm } from '../../types/global';


export const RegisterFeed: FC = () => {
  const [feed, setFeed] = useState<FeedForm>({
    name: '',
    date: new Date(),
    quantity: 0,
    type: '',
    animalId: ''
  });
  
  const [success, setSuccess] = useState(false);

  // Lista de ejemplos de animales para el dropdown
  const animals = [
    { id: "1", name: "Vaca 001", category: "Bovino" },
    { id: "2", name: "Vaca 002", category: "Bovino" },
    { id: "3", name: "Cerdo 001", category: "Porcino" },
    { id: "4", name: "Caballo 001", category: "Equino" },
    { id: "5", name: "Oveja 001", category: "Ovino" }
  ];

  // Lista común de alimentos para el dropdown
  const commonFeeds = [
    "Pasto fresco",
    "Heno",
    "Pienso comercial",
    "Maíz molido",
    "Salvado de trigo",
    "Concentrado proteico",
    "Suplemento vitamínico",
    "Ensilaje de maíz",
    "Alfalfa"
  ];

  // Tipos de alimentación
  const feedTypes = [
    "Forraje",
    "Concentrado",
    "Suplemento",
    "Grano",
    "Mixto"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      // Convertir a objeto Date
      setFeed(prev => ({
        ...prev,
        date: new Date(value)
      }));
    } else if (name === 'quantity') {
      // Convertir a número
      setFeed(prev => ({
        ...prev,
        quantity: parseFloat(value) || 0
      }));
    } else {
      setFeed(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Alimentación registrada:", feed);
    // Aquí iría la lógica para enviar los datos al backend
    
    // Mostrar mensaje de éxito
    setSuccess(true);
    
    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setSuccess(false);
      setFeed({
        name: '',
        date: new Date(),
        quantity: 0,
        type: '',
        animalId: ''
      });
    }, 3000);
  };

  // Formatear fecha para input type="date"
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Registrar <span className="text-orange-600">Alimentación</span>
        </h1>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">¡Alimentación registrada con éxito!</p>
            </div>
          ) : null}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nombre del alimento
              </label>
              <select
                id="name"
                name="name"
                value={feed.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="" disabled>Selecciona un alimento</option>
                {commonFeeds.map((feedName) => (
                  <option key={feedName} value={feedName}>{feedName}</option>
                ))}
                <option value="other">Otro alimento...</option>
              </select>
              
              {feed.name === 'other' && (
                <input
                  type="text"
                  placeholder="Escribe el nombre del alimento"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:ring-orange-500 focus:border-orange-500"
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                  Fecha de alimentación
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formatDate(feed.date)}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                  Cantidad (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={feed.quantity}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <Scale className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
                Tipo de alimentación
              </label>
              <div className="relative">
                <select
                  id="type"
                  name="type"
                  value={feed.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="" disabled>Selecciona el tipo</option>
                  {feedTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <Layers className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div>
              <label htmlFor="animalId" className="block text-gray-700 font-medium mb-2">
                Animal
              </label>
              <select
                id="animalId"
                name="animalId"
                value={feed.animalId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="" disabled>Selecciona un animal</option>
                {animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name} - {animal.category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end gap-4 mt-8">
              <button 
                type="button" 
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-orange-600"
              >
                Registrar Alimentación
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Nutrición óptima</h2>
              <p className="text-gray-600">
                Una alimentación adecuada es esencial para la salud y la productividad de tu ganado. 
                Mantén un registro completo para optimizar costos y resultados.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Beneficios del seguimiento</h2>
              <ul className="text-gray-600 space-y-2">
                <li>• Control del consumo y costos asociados</li>
                <li>• Evaluación de efectividad nutricional</li>
                <li>• Optimización de dietas por animal</li>
                <li>• Prevención de problemas digestivos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
