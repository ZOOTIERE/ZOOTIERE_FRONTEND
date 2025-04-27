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
  address_finca: string;
  num_trabajadores: number;
  hectareas: number;
  num_vacas: number;
  num_crias: number;
  especialidad: string;
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
  id_animal?: number;
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

export interface SpeciesForm {
  species_name: string; 
}


export interface RazasForm {
  name_race: string;
  description: string;
}

export interface VacunaFormData {
  animal: number;
  fecha_aplicacion: string;
  tipo_vacuna: string;
  dosis: string;
}

export interface Plan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}