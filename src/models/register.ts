export interface UnidadAprendizaje {
    id: number; // Identificador único de la unidad
    nombre: string; // Nombre de la unidad
    competenciaEspecifica: string; // Competencia específica
    numeroSemanas: number; // Número de semanas
    resultadoAprendizaje: string; // Resultado de aprendizaje
    porcentajes: {
      saber: number; // Porcentaje de Saber
      hacerSer: number; // Porcentaje de Hacer-Ser
    };
  }
  
  export interface RegistroAsignatura {
    asignatura: string;
    profesorAsignado: string;
    duracionHoras: number;
    familiaCarrera: string;
    cuatrimestre: string;
    nivelCompetencia: string;
    objetivoGeneral: string;
    unidadesAprendizaje: UnidadAprendizaje[]; // Lista de unidades de aprendizaje
  }