import { AddCard, Card } from '../../components/Card/Card';


// Datos de ejemplo para las tarjetas
const cardData = [
  { titulo: 'Finca 1', subtitulo: 'Ubicación: Valle', imagenUrl: 'url-de-imagen-1.jpg' },
  { titulo: 'Finca 2', subtitulo: 'Ubicación: Montaña', imagenUrl: 'url-de-imagen-2.jpg' },
  { titulo: 'Finca 3', subtitulo: 'Ubicación: Costa', imagenUrl: 'url-de-imagen-3.jpg' },
];

export const Finca = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fincas</h1>
      <div className="flex flex-wrap">
        {cardData.map((card, index) => (
          <Card
            key={index}
            titulo={card.titulo}
            subtitulo={card.subtitulo}
            imagenUrl={card.imagenUrl}
          />
        ))}
        <AddCard type='finca'/>
      </div>
    </div>
  );
};
