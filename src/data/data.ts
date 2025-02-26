export interface Materia {
    nombre: string;
    profesor: string;
    horas: number;
  }
  
  export const data = {
    materias: [
      { nombre: "Matemáticas", profesor: "Profesor A", horas: 60 },
      { nombre: "Base de Datos", profesor: "Profesor B", horas: 50 },
      { nombre: "Dispositivos Móviles", profesor: "Profesor C", horas: 40 },
    ],
    familiasCarreras: ["TIC", "Administración", "Industrial"],
    cuatrimestres: ["1er", "2do", "3ero", "4to"],
    unidadesAprendizaje: [1, 2, 3, 4],
  };