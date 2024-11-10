import { AddCard, Card } from '../../components/Card/Card';


// Datos de ejemplo para las tarjetas
const cardData = [
  { titulo: 'Vaca 1', subtitulo: 'carne', imagenUrl: 'url-de-imagen-1.jpg' },
  { titulo: 'Vaca 2', subtitulo: 'cuero', imagenUrl: 'url-de-imagen-2.jpg' },
  { titulo: 'Vaca 3', subtitulo: 'lechera', imagenUrl: 'url-de-imagen-3.jpg' },
];

export const Vacas = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vacas</h1>
      <div className="flex flex-wrap">
        {cardData.map((card, index) => (
          <Card
            key={index}
            titulo={card.titulo}
            subtitulo={card.subtitulo}
            imagenUrl={card.imagenUrl}
          />
        ))}
        <AddCard />
      </div>
    </div>
  );
};
