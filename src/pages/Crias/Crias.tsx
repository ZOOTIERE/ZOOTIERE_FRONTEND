import { AddCard, Card } from '../../components/Card/Card';


// Datos de ejemplo para las tarjetas
const cardData = [
  { titulo: 'Cria 1', subtitulo: 'vaca 1', imagenUrl: 'url-de-imagen-1.jpg' },
  { titulo: 'Cria 2', subtitulo: 'vaca 3', imagenUrl: 'url-de-imagen-2.jpg' },
  { titulo: 'Cria 3', subtitulo: 'vaca 1', imagenUrl: 'url-de-imagen-3.jpg' },
];

export const Crias = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crias</h1>
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
