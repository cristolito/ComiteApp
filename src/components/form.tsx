import React, { useState, useEffect } from "react";
import { materias, profesores, familiasCarreras, cuatrimestres } from "../data/data";
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
  const [numUnidades, setNumUnidades] = useState<number>(1); // Número de unidades seleccionadas
  const [unidades, setUnidades] = useState<UnidadAprendizaje[]>([]);

  // Inicializar las unidades cuando cambia el número de unidades
  useEffect(() => {
    const nuevasUnidades = Array.from({ length: numUnidades }, (_, index) => ({
      id: index + 1,
      nombre: "",
      competenciaEspecifica: "",
      numeroSemanas: 0,
      resultadoAprendizaje: "",
      porcentajes: {
        saber: 0,
        hacerSer: 0,
      },
    }));
    setUnidades(nuevasUnidades);
  }, [numUnidades]);

  // Manejar cambios en los porcentajes de Saber y Hacer-Ser
  const handlePorcentajeChange = (
    index: number,
    campo: keyof UnidadAprendizaje["porcentajes"],
    valor: number
  ) => {
    const nuevasUnidades = [...unidades];
    nuevasUnidades[index].porcentajes[campo] = valor;
    setUnidades(nuevasUnidades);
  };

  // Validar que la suma de los porcentajes sea 100%
  const validarPorcentajes = (): boolean => {
    const totalSaber = unidades.reduce((sum, unidad) => sum + unidad.porcentajes.saber, 0);
    const totalHacerSer = unidades.reduce((sum, unidad) => sum + unidad.porcentajes.hacerSer, 0);
    return totalSaber === 100 && totalHacerSer === 100;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarPorcentajes()) {
      alert("La suma de los porcentajes de Saber y Hacer-Ser debe ser 100%.");
      return;
    }

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

  // Generar campos para las unidades de aprendizaje
  const generarCamposUnidades = () => {
    return unidades.map((unidad, index) => (
      <div key={index} className="mb-4 p-3 border rounded">
        <h5>Unidad de Aprendizaje {index + 1}</h5>
        <div className="mb-3">
          <label className="form-label">Nombre de la Unidad</label>
          <input
            type="text"
            className="form-control"
            value={unidad.nombre}
            onChange={(e) => {
              const nuevasUnidades = [...unidades];
              nuevasUnidades[index].nombre = e.target.value;
              setUnidades(nuevasUnidades);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Competencia Específica</label>
          <textarea
            className="form-control"
            value={unidad.competenciaEspecifica}
            onChange={(e) => {
              const nuevasUnidades = [...unidades];
              nuevasUnidades[index].competenciaEspecifica = e.target.value;
              setUnidades(nuevasUnidades);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Semanas</label>
          <input
            type="number"
            className="form-control"
            value={unidad.numeroSemanas}
            onChange={(e) => {
              const nuevasUnidades = [...unidades];
              nuevasUnidades[index].numeroSemanas = parseInt(e.target.value);
              setUnidades(nuevasUnidades);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Resultado de Aprendizaje</label>
          <textarea
            className="form-control"
            value={unidad.resultadoAprendizaje}
            onChange={(e) => {
              const nuevasUnidades = [...unidades];
              nuevasUnidades[index].resultadoAprendizaje = e.target.value;
              setUnidades(nuevasUnidades);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Porcentaje de Saber</label>
          <input
            type="number"
            className="form-control"
            value={unidad.porcentajes.saber}
            onChange={(e) =>
              handlePorcentajeChange(index, "saber", parseInt(e.target.value))
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Porcentaje de Hacer-Ser</label>
          <input
            type="number"
            className="form-control"
            value={unidad.porcentajes.hacerSer}
            onChange={(e) =>
              handlePorcentajeChange(index, "hacerSer", parseInt(e.target.value))
            }
          />
        </div>
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      {/* Campos del formulario (asignatura, profesor, etc.) */}
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
      <div className="mb-3">
        <label className="form-label">Número de Unidades de Aprendizaje</label>
        <select
          className="form-select"
          value={numUnidades}
          onChange={(e) => setNumUnidades(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      {generarCamposUnidades()}
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
};

export default Formulario;