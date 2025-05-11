import { FC, useEffect, useState } from 'react';
import { WorkerForm } from '../../types/global';
import { getUserDataFromLocalStorage } from '../../utils/getUserData';
import { FincaService } from '../../api';

export const CreateWorker: FC = () => {
  const [worker, setWorker] = useState<WorkerForm>({
    name: '',
    rol: '',
    fincaId: ''
  });
  
  const [success, setSuccess] = useState(false);
  const [fincas, setFincas] = useState<{ id: string; name: string }[]>([]);

  const id = getUserDataFromLocalStorage()?.id as string;

  useEffect(() => {
    const fetchFincas = async () => {
      const fetchedFincas = await FincaService.getFincaID(id);
      setFincas(fetchedFincas.data);
    };
    fetchFincas();
  }, [id]);

  const roles = [
    "Administrador",
    "Capataz",
    "Agricultor",
    "Ganadero",
    "Veterinario",
    "Mantenimiento"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWorker(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Trabajador creado:", worker);
    // Aquí iría la lógica para enviar los datos al backend
    
    // Mostrar mensaje de éxito
    setSuccess(true);
    
    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setSuccess(false);
      setWorker({
        name: '',
        rol: '',
        fincaId: ''
      });
    }, 3000);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Registrar <span className="text-green-600">Trabajador</span>
        </h1>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">¡Trabajador registrado con éxito!</p>
            </div>
          ) : null}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={worker.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Ingresa el nombre del trabajador"
              />
            </div>
            
            <div>
              <label htmlFor="rol" className="block text-gray-700 font-medium mb-2">
                Rol / Cargo
              </label>
              <select
                id="rol"
                name="rol"
                value={worker.rol}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="" disabled>Selecciona un rol</option>
                {roles.map((rol) => (
                  <option key={rol} value={rol}>{rol}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="fincaId" className="block text-gray-700 font-medium mb-2">
                Finca asignada
              </label>
              <select
                id="fincaId"
                name="fincaId"
                value={worker.fincaId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="" disabled>Selecciona una finca</option>
                {fincas.map((finca) => (
                  <option key={finca.id} value={finca.id}>{finca.name}</option>
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
                className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600"
              >
                Guardar Trabajador
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Gestión completa de personal
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Optimiza la asignación de tareas y realiza un seguimiento del rendimiento 
            de cada trabajador para mejorar la productividad de tu finca.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateWorker;