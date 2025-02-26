export interface Materia {
  id: number;
  nombre: string;
  horas: number;
}

export interface Profesor {
  id: number;
  nombre: string;
}

export const materias: Materia[] = [
  { id: 1, nombre: "Matemáticas", horas: 60 },
  { id: 2, nombre: "Base de Datos", horas: 50 },
  { id: 3, nombre: "Dispositivos Móviles", horas: 40 },
  { id: 4, nombre: "Expresión Oral y Escrita", horas: 30 },
  { id: 5, nombre: "Programación Avanzada", horas: 70 },
  { id: 6, nombre: "Redes de Computadoras", horas: 55 },
  { id: 7, nombre: "Seguridad Informática", horas: 45 },
  { id: 8, nombre: "Inteligencia Artificial", horas: 65 },
  { id: 9, nombre: "Desarrollo Web", horas: 50 },
  { id: 10, nombre: "Sistemas Operativos", horas: 60 },
];

export const profesores: Profesor[] = [
  { id: 1, nombre: "Profesor A" },
  { id: 2, nombre: "Profesor B" },
  { id: 3, nombre: "Profesor C" },
  { id: 4, nombre: "Profesor D" },
  { id: 5, nombre: "Profesor E" },
  { id: 6, nombre: "Profesor F" },
  { id: 7, nombre: "Profesor G" },
  { id: 8, nombre: "Profesor H" },
  { id: 9, nombre: "Profesor I" },
  { id: 10, nombre: "Profesor J" },
];

export const familiasCarreras: string[] = [
  "TIC",
  "Administración",
  "Industrial",
  "InnovaciónYDesarrolloEstratégico",
];

export const cuatrimestres: string[] = [
  "1er",
  "2do",
  "3er",
  "4to",
  "5to",
  "7mo",
  "8vo",
  "9no",
  "10mo",
];

export const unidadesAprendizaje: number[] = [1, 2, 3, 4, 5, 6];