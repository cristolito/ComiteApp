export interface UnidadAprendizaje {
    id: number;
    nombre: string;
    competenciaEspecifica: string;
    numeroSemanas: number;
    resultadoAprendizaje: string;
    porcentajes: {
      saber: number;
      hacerSer: number;
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
    unidadesAprendizaje: UnidadAprendizaje[];
  }