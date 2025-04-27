// components/Footer.tsx
import { FC } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-400">Zootiere</h3>
            <p className="text-gray-400">
              Soluciones tecnológicas para la gestión moderna de fincas agrícolas y ganaderas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-green-400">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-green-400">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-green-400">Características</a></li>
              <li><a href="#" className="hover:text-green-400">Precios</a></li>
              <li><a href="#" className="hover:text-green-400">Blog</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt />
                <span>Av. Agricultura 123, Ciudad Agro</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope />
                <span>info@Zootiere.com</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suscríbete</h4>
            <p className="text-gray-400 mb-4">Recibe actualizaciones y noticias agrícolas.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Tu correo"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white flex-grow"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-gray-700 py-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zootiere. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};