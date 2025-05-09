import { UserData } from "../types/global";

  export function getUserDataFromLocalStorage(): UserData | null {
    const key = 'data'; // <-- ¡Reemplaza 'yourKey' con la clave real que usaste!
  
    try {
      const storedData = localStorage.getItem(key);
  
      if (storedData === null) {
        // La clave no existe en localStorage
        return null;
      }
  
      // Intenta parsear la cadena JSON a un objeto UserData
      const userData: UserData = JSON.parse(storedData);
  
      // Opcional: Puedes hacer validaciones adicionales aquí si necesitas
      // para asegurarte de que el objeto parseado tiene la estructura esperada
  
      return userData;
  
    } catch (error) {
      // Ocurrió un error al obtener o parsear los datos (por ejemplo, JSON inválido)
      console.error('Error al obtener datos de localStorage:', error);
      return null;
    }
  }
  