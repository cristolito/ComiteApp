import React, { useState } from "react";
import { materias, profesores, familiasCarreras, cuatrimestres, unidadesAprendizaje } from "../data/data";
import { RegistroAsignatura, UnidadAprendizaje } from "../models/register";

interface FormularioProps {
  agregarRegistro: (registro: RegistroAsignatura) => void;
}

const Formulario: React.FC<FormularioProps> = ({ agregarRegistro }) => {
  const [asignatura, setAsignatura] = useState<string>("");
  const [profesorAsignado, setProfesorAsignado] = useState<string>("");
  const [familiaCarrera, setFamiliaCarrera] = useState<string>("");
  const [cuatrimestre, setCuatrimestre] = useState<string>("");
  const [nivelCompetencia, setNivelCompetencia] = useState<string>("");
  const [objetivoGeneral, setObjetivoGeneral] = useState<string>("");
  const [unidades, setUnidades] = useState<UnidadAprendizaje[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const registro: RegistroAsignatura = {
      asignatura,
      profesorAsignado,
      duracionHoras: materias.find((m) => m.nombre === asignatura)?.horas || 0,
      familiaCarrera,
      cuatrimestre,
      nivelCompetencia,
      objetivoGeneral,
      unidadesAprendizaje: unidades,
    };
    agregarRegistro(registro);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Asignatura</label>
        <select
          className="form-select"
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
        >
          <option value="">Seleccione una asignatura</option>
          {materias.map((materia) => (
            <option key={materia.id} value={materia.nombre}>
              {materia.nombre} ({materia.horas} horas)
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Profesor Asignado</label>
        <select
          className="form-select"
          value={profesorAsignado}
          onChange={(e) => setProfesorAsignado(e.target.value)}
        >
          <option value="">Seleccione un profesor</option>
          {profesores.map((profesor) => (
            <option key={profesor.id} value={profesor.nombre}>
              {profesor.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Familia de Carrera</label>
        <select
          className="form-select"
          value={familiaCarrera}
          onChange={(e) => setFamiliaCarrera(e.target.value)}
        >
          <option value="">Seleccione una familia</option>
          {familiasCarreras.map((familia, index) => (
            <option key={index} value={familia}>
              {familia}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Cuatrimestre</label>
        <select
          className="form-select"
          value={cuatrimestre}
          onChange={(e) => setCuatrimestre(e.target.value)}
        >
          <option value="">Seleccione un cuatrimestre</option>
          {cuatrimestres.map((cuatrimestre, index) => (
            <option key={index} value={cuatrimestre}>
              {cuatrimestre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Nivel de Competencia</label>
        <textarea
          className="form-control"
          value={nivelCompetencia}
          onChange={(e) => setNivelCompetencia(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Objetivo General</label>
        <textarea
          className="form-control"
          value={objetivoGeneral}
          onChange={(e) => setObjetivoGeneral(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
};

export default Formulario;