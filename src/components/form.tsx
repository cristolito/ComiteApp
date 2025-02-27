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
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  // Inicializar las unidades cuando cambia el número de unidades
  useEffect(() => {
    const nuevasUnidades = Array.from({ length: numUnidades }, (_, index) => ({
      id: index + 1,
      nombre: "",
      competenciaEspecifica: "",
      numeroSemanas: 1, // Valor por defecto: 1
      resultadoAprendizaje: "",
      porcentajes: {
        saber: 1, // Valor por defecto: 1
        hacerSer: 1, // Valor por defecto: 1
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
    if (valor < 1) {
      nuevasUnidades[index].porcentajes.saber = 1;
    } else if (valor > 99) {
      nuevasUnidades[index].porcentajes.saber = 99;
    } else {
      nuevasUnidades[index].porcentajes[campo] = valor; // Validar que sea mayor o igual a 1
    }
    setUnidades(nuevasUnidades);
  };

  // Validar que la suma de los porcentajes sea 100% para cada unidad
  const validarPorcentajes = (): boolean => {
    for (const unidad of unidades) {
      const totalPorcentajes =
        unidad.porcentajes.saber + unidad.porcentajes.hacerSer;
      if (totalPorcentajes !== 100) {
        return false;
      }
    }
    return true;
  };

  // Validar campos vacíos y select
  const validarCampos = (): boolean => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!asignatura) nuevosErrores.asignatura = "La asignatura es requerida";
    if (!profesorAsignado)
      nuevosErrores.profesorAsignado = "El profesor es requerido";
    if (!familiaCarrera)
      nuevosErrores.familiaCarrera = "La familia de carrera es requerida";
    if (!cuatrimestre)
      nuevosErrores.cuatrimestre = "El cuatrimestre es requerido";
    if (!nivelCompetencia)
      nuevosErrores.nivelCompetencia = "El nivel de competencia es requerido";
    if (!objetivoGeneral)
      nuevosErrores.objetivoGeneral = "El objetivo general es requerido";

    unidades.forEach((unidad, index) => {
      if (!unidad.nombre)
        nuevosErrores[`unidad${index}Nombre`] =
          "El nombre de la unidad es requerido";
      if (!unidad.competenciaEspecifica)
        nuevosErrores[`unidad${index}Competencia`] =
          "La competencia específica es requerida";
      if (unidad.numeroSemanas < 1)
        nuevosErrores[`unidad${index}Semanas`] =
          "El número de semanas debe ser mayor o igual a 1";
      if (!unidad.resultadoAprendizaje)
        nuevosErrores[`unidad${index}Resultado`] =
          "El resultado de aprendizaje es requerido";
      if (unidad.porcentajes.saber < 1 || unidad.porcentajes.hacerSer < 1) {
        nuevosErrores[`unidad${index}Porcentajes`] =
          "Los porcentajes deben ser mayores o iguales a 1";
      }
    });

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarCampos()) {
      alert(
        "Por favor, complete todos los campos requeridos y asegúrese de que los valores sean válidos."
      );
      return;
    }

    if (!validarPorcentajes()) {
      alert(
        "La suma de los porcentajes de Saber y Hacer-Ser debe ser 100% en conjunto."
      );
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
          {errores[`unidad${index}Nombre`] && (
            <span className="text-danger">
              {errores[`unidad${index}Nombre`]}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Competencia Específica</label>
          <textarea
            className="form-control"
            value={unidad.competenciaEspecifica}
            maxLength={1000}
            onChange={(e) => {
              const nuevasUnidades = [...unidades];
              nuevasUnidades[index].competenciaEspecifica = e.target.value;
              setUnidades(nuevasUnidades);
            }}
          />
          {errores[`unidad${index}Competencia`] && (
            <span className="text-danger">
              {errores[`unidad${index}Competencia`]}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Semanas</label>
          <input
            type="number"
            className="form-control"
            value={unidad.numeroSemanas}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              const nuevasUnidades = [...unidades];
              nuevasUnidades[index].numeroSemanas = value < 1 ? 1 : value; // Validar que sea mayor o igual a 1
              setUnidades(nuevasUnidades);
            }}
            min="1" // Evita valores menores a 1
          />
          {errores[`unidad${index}Semanas`] && (
            <span className="text-danger">
              {errores[`unidad${index}Semanas`]}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Resultado de Aprendizaje</label>
          <textarea
            className="form-control"
            value={unidad.resultadoAprendizaje}
            maxLength={1000}
            onChange={(e) => {
              const nuevasUnidades = [...unidades];
              nuevasUnidades[index].resultadoAprendizaje = e.target.value;
              setUnidades(nuevasUnidades);
            }}
          />
          {errores[`unidad${index}Resultado`] && (
            <span className="text-danger">
              {errores[`unidad${index}Resultado`]}
            </span>
          )}
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
              handlePorcentajeChange(
                index,
                "hacerSer",
                parseInt(e.target.value)
              )
            }
          />
        </div>
        {errores[`unidad${index}Porcentajes`] && (
          <span className="text-danger">
            {errores[`unidad${index}Porcentajes`]}
          </span>
        )}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-3">
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
          {errores.asignatura && (
            <span className="text-danger">{errores.asignatura}</span>
          )}
        </div>
        <div className="col-md-6 mb-3">
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
          {errores.profesorAsignado && (
            <span className="text-danger">{errores.profesorAsignado}</span>
          )}
        </div>
        <div className="col-md-6 mb-3">
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
          {errores.familiaCarrera && (
            <span className="text-danger">{errores.familiaCarrera}</span>
          )}
        </div>
        <div className="col-md-6 mb-3">
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
          {errores.cuatrimestre && (
            <span className="text-danger">{errores.cuatrimestre}</span>
          )}
        </div>
        <div className="col-12 mb-3">
          <label className="form-label">Nivel de Competencia</label>
          <textarea
            className="form-control"
            value={nivelCompetencia}
            onChange={(e) => setNivelCompetencia(e.target.value)}
            maxLength={1000}
          />
          {errores.nivelCompetencia && (
            <span className="text-danger">{errores.nivelCompetencia}</span>
          )}
        </div>
        <div className="col-12 mb-3">
          <label className="form-label">Objetivo General</label>
          <textarea
            className="form-control"
            value={objetivoGeneral}
            onChange={(e) => setObjetivoGeneral(e.target.value)}
            maxLength={1000}
          />
          {errores.objetivoGeneral && (
            <span className="text-danger">{errores.objetivoGeneral}</span>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Número de Unidades de Aprendizaje
          </label>
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
      </div>
      {generarCamposUnidades()}
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
};

export default Formulario;