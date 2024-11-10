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
  id_finca: number;
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

export interface AnimalData {
  id_animal: number;
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