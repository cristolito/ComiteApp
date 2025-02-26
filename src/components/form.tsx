import React, { useState } from "react";
import { data, Materia } from "../data/data";

interface UnidadDetalle {
  competenciaEspecifica: string;
  semanas: number;
  resultadoAprendizaje: string;
  saber: number;
  hacerSer: number;
}

interface FormularioProps {
  agregarRegistro: (registro: any) => void;
}

const Formulario: React.FC<FormularioProps> = ({ agregarRegistro }) => {
  const [materia, setMateria] = useState<string>("");
  const [familiaCarrera, setFamiliaCarrera] = useState<string>("");
  const [cuatrimestre, setCuatrimestre] = useState<string>("");
  const [unidadesAprendizaje, setUnidadesAprendizaje] = useState<number>(1);
  const [competencia, setCompetencia] = useState<string>("");
  const [objetivoGeneral, setObjetivoGeneral] = useState<string>("");
  const [unidadesDetalle, setUnidadesDetalle] = useState<UnidadDetalle[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoRegistro = {
      materia,
      familiaCarrera,
      cuatrimestre,
      unidadesAprendizaje,
      competencia,
      objetivoGeneral,
      unidadesDetalle,
    };
    agregarRegistro(nuevoRegistro);
  };

  const handleUnidadesChange = (
    index: number,
    field: keyof UnidadDetalle,
    value: string | number
  ) => {
    const nuevasUnidades = [...unidadesDetalle];
    nuevasUnidades[index] = { ...nuevasUnidades[index], [field]: value };
    setUnidadesDetalle(nuevasUnidades);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={materia} onChange={(e) => setMateria(e.target.value)}>
        {data.materias.map((materia: Materia, index: number) => (
          <option key={index} value={materia.nombre}>
            {materia.nombre}
          </option>
        ))}
      </select>
      <select
        value={familiaCarrera}
        onChange={(e) => setFamiliaCarrera(e.target.value)}
      >
        {data.familiasCarreras.map((familia: string, index: number) => (
          <option key={index} value={familia}>
            {familia}
          </option>
        ))}
      </select>
      <select
        value={cuatrimestre}
        onChange={(e) => setCuatrimestre(e.target.value)}
      >
        {data.cuatrimestres.map((cuatrimestre: string, index: number) => (
          <option key={index} value={cuatrimestre}>
            {cuatrimestre}
          </option>
        ))}
      </select>
      <select
        value={unidadesAprendizaje}
        onChange={(e) => setUnidadesAprendizaje(parseInt(e.target.value))}
      >
        {data.unidadesAprendizaje.map((unidad: number, index: number) => (
          <option key={index} value={unidad}>
            {unidad}
          </option>
        ))}
      </select>
      <textarea
        value={competencia}
        onChange={(e) => setCompetencia(e.target.value)}
        placeholder="Nivel de competencia"
      />
      <textarea
        value={objetivoGeneral}
        onChange={(e) => setObjetivoGeneral(e.target.value)}
        placeholder="Objetivo general de la asignatura"
      />
      {Array.from({ length: unidadesAprendizaje }, (_, index) => (
        <div key={index}>
          <textarea
            value={unidadesDetalle[index]?.competenciaEspecifica || ""}
            onChange={(e) =>
              handleUnidadesChange(index, "competenciaEspecifica", e.target.value)
            }
            placeholder="Competencia específica"
          />
          <input
            type="number"
            value={unidadesDetalle[index]?.semanas || ""}
            onChange={(e) =>
              handleUnidadesChange(index, "semanas", parseInt(e.target.value))
            }
            placeholder="Número de semanas"
          />
          <textarea
            value={unidadesDetalle[index]?.resultadoAprendizaje || ""}
            onChange={(e) =>
              handleUnidadesChange(index, "resultadoAprendizaje", e.target.value)
            }
            placeholder="Resultado de aprendizaje"
          />
          <input
            type="number"
            value={unidadesDetalle[index]?.saber || ""}
            onChange={(e) =>
              handleUnidadesChange(index, "saber", parseInt(e.target.value))
            }
            placeholder="Saber (%)"
          />
          <input
            type="number"
            value={unidadesDetalle[index]?.hacerSer || ""}
            onChange={(e) =>
              handleUnidadesChange(index, "hacerSer", parseInt(e.target.value))
            }
            placeholder="Hacer-Ser (%)"
          />
        </div>
      ))}
      <button type="submit">Guardar</button>
    </form>
  );
};

export default Formulario;