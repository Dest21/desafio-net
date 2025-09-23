export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  country?: string;
  languages?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  country?: string;
  languages?: string[];
  isActive: boolean;
}

export interface UserUpdateDto {
  email: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  country?: string;
  languages?: string[];
  isActive: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expires: string;
  user: User;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: string[];
}

export const COUNTRIES = [
  'Argentina',
  'Bolivia',
  'Brasil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Ecuador',
  'El Salvador',
  'España',
  'Guatemala',
  'Honduras',
  'México',
  'Nicaragua',
  'Panamá',
  'Paraguay',
  'Perú',
  'Puerto Rico',
  'República Dominicana',
  'Uruguay',
  'Venezuela'
];

export const LANGUAGES = [
  'Español',
  'Inglés',
  'Francés',
  'Alemán',
  'Italiano',
  'Portugués',
  'Ruso',
  'Chino',
  'Japonés',
  'Árabe'
];