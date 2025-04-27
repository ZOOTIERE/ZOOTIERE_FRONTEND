import { FC } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación

export const NewUser: FC = () => {
  const navigate = useNavigate(); // Hook para navegar programáticamente

  const handleCreateFincaClick = () => {
    // Define la ruta a la página de registro de fincas
    // Asegúrate de que esta ruta coincida con la configurada en tus rutas de React Router
    navigate('/fincas/new'); // O la ruta que uses, por ejemplo '/register-finca'
  };

  return (
    // Usamos clases similares para mantener la estética (fondo, centrado, padding)
    <div className="pt-20 min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 py-12 text-center"> {/* Ajustamos padding y max-width un poco */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          ¡Bienvenido a Zootiere!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Parece que aún no tienes ninguna finca registrada en tu cuenta.
          Para comenzar a gestionar tu producción agrícola o ganadera, por favor, crea tu primera finca.
        </p>
        
        {/* Botón para crear finca, siguiendo el estilo del botón de la landing */}
        <button
          onClick={handleCreateFincaClick}
          className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          Crear mi Primera Finca
        </button>
      </div>
    </div>
  );
};