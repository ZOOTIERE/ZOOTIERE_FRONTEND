export interface LoginFormData {
  email: string;
  password: string;
  }

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface FincaFormData {
  name: string;
  address: string;
  category: 'Ganadera' | 'Agricola' | 'Mixta';
  employees: number;
  hectares: number;
  animals?: string[];
  cropsHectares?: number;
  livestockHectares?: number;
  userId: string;
}

export interface FincaData {
  id: number;
  name: string;
  address_finca: string;
  num_trabajadores: number;
  hectareas: number;
  num_vacas: number;
  num_crias: number;
  especialidad: string;
}

export interface AnimalFormData {
  name: string;
  species: string;
  breed: string;
  birthDate: Date;
  fincaId: string;
  fatherId: string | null;
  motherId: string | null;
}
export interface Animal {
  name: string;
  type: string;
  imagenUrl?: string; // Puedes ajustar los campos según tu API
}

export interface AnimalData {
  id : number;
  name: string;
  marca: string;
  species: number;
  date_of_birth: string;
  date_of_death?: string;
  state: string;
  sex: string;
  id_user: number;
  id_father?: number;
  id_mother?: number;
  id_race: number;
  id_finca: number;
}

export interface FeedForm {
  name: string;
  date: Date;
  quantity: number;
  type: string;
  animalId: string;
}


export interface VaccineForm {
  name: string;
  date: Date;
  dose: string;
  animalId: string;
}

export interface WorkerForm {
  name: string;
  rol: string;
  fincaId: string;
}

export interface Plan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}