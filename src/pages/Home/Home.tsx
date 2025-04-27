import { FC } from 'react';

export const Home: FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Gestión Inteligente para 
          <span className="text-green-600"> Tu Finca</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Controla la producción agrícola y ganadera, optimiza recursos y toma decisiones basadas en datos.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-600">
            Comenzar
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Por qué Zootiere?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">🐄 Gestión Ganadera</h3>
            <p className="text-gray-600">Registro de pedigrí, vacunas y alimentación del ganado.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">🌱 Seguimiento Agrícola</h3>
            <p className="text-gray-600">Planificación de cultivos y control de cosechas.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">📊 Reportes Automáticos</h3>
            <p className="text-gray-600">Genera informes de productividad en tiempo real.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
