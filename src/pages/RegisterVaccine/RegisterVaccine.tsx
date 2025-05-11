import { FC, useState } from 'react';
import { Calendar } from 'lucide-react';
import { VaccineForm } from '../../types/global';


export const RegisterVaccine: FC = () => {
  const [vaccine, setVaccine] = useState<VaccineForm>({
    name: '',
    date: new Date(),
    dose: '',
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

  // Lista común de vacunas para el dropdown
  const commonVaccines = [
    "Aftosa",
    "Brucelosis",
    "Rabia bovina",
    "Carbunclo",
    "Clostridial",
    "Leptospirosis",
    "IBR/DVB",
    "Parainfluenza"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      // Convertir a objeto Date
      setVaccine(prev => ({
        ...prev,
        date: new Date(value)
      }));
    } else {
      setVaccine(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Vacuna registrada:", vaccine);
    // Aquí iría la lógica para enviar los datos al backend
    
    // Mostrar mensaje de éxito
    setSuccess(true);
    
    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setSuccess(false);
      setVaccine({
        name: '',
        date: new Date(),
        dose: '',
        animalId: ''
      });
    }, 3000);
  };

  // Formatear fecha para input type="date"
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Registrar <span className="text-purple-600">Vacuna</span>
        </h1>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">¡Vacuna registrada con éxito!</p>
            </div>
          ) : null}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nombre de la vacuna
              </label>
              <select
                id="name"
                name="name"
                value={vaccine.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="" disabled>Selecciona una vacuna</option>
                {commonVaccines.map((vax) => (
                  <option key={vax} value={vax}>{vax}</option>
                ))}
                <option value="other">Otra vacuna...</option>
              </select>
              
              {vaccine.name === 'other' && (
                <input
                  type="text"
                  placeholder="Escribe el nombre de la vacuna"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:ring-purple-500 focus:border-purple-500"
                />
              )}
            </div>
            
            <div>
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                Fecha de aplicación
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formatDate(vaccine.date)}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:ring-purple-500 focus:border-purple-500"
                />
                <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div>
              <label htmlFor="dose" className="block text-gray-700 font-medium mb-2">
                Dosis
              </label>
              <input
                type="text"
                id="dose"
                name="dose"
                value={vaccine.dose}
                onChange={handleChange}
                placeholder="Ej: 5ml, 10cc, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="animalId" className="block text-gray-700 font-medium mb-2">
                Animal
              </label>
              <select
                id="animalId"
                name="animalId"
                value={vaccine.animalId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
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
                className="bg-purple-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-purple-600"
              >
                Registrar Vacuna
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Control sanitario efectivo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mantén un registro preciso de las vacunas aplicadas a tu ganado 
            para garantizar la salud y productividad de tus animales.
          </p>
        </div>
      </div>
    </div>
  );
};