import { FC } from 'react';
import { Plan } from '../../types/global';



export const Pricing: FC = () => {
  const plans: Plan[] = [
    {
      name: "Básico",
      price: "29",
      features: [
        "Hasta 50 animales",
        "2 cultivos simultáneos",
        "Reportes básicos",
        "Soporte por email"
      ]
    },
    {
      name: "Profesional",
      price: "79",
      features: [
        "Animales ilimitados",
        "5 cultivos simultáneos",
        "Reportes avanzados",
        "Soporte prioritario",
        "Integración API"
      ],
      isPopular: true
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-8">Planes para Todo Tipo de Fincas</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`border rounded-xl p-6 text-center ${
                plan.isPopular ? "border-2 border-green-500" : ""
              }`}
            >
              {plan.isPopular && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Más Popular
                </span>
              )}
              <h3 className="text-2xl font-bold my-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-4">
                ${plan.price}<span className="text-lg text-gray-500">/mes</span>
              </p>
              <ul className="mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="mb-2">✔️ {feature}</li>
                ))}
              </ul>
              <button className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600">
                Elegir Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};