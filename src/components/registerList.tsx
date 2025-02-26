import React, { useState } from "react";

interface Registro {
  materia: string;
  familiaCarrera: string;
  cuatrimestre: string;
  unidadesAprendizaje: number;
  competencia: string;
  objetivoGeneral: string;
  unidadesDetalle: any[];
}

interface ListaRegistrosProps {
  registros: Registro[];
}

const ListaRegistros: React.FC<ListaRegistrosProps> = ({ registros }) => {
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [registroSeleccionado, setRegistroSeleccionado] =
    useState<Registro | null>(null);

  const abrirModal = (registro: Registro) => {
    setRegistroSeleccionado(registro);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <div>
      <h2>Lista de Registros</h2>
      <ul>
        {registros.map((registro, index) => (
          <li key={index}>
            <span>
              {registro.cuatrimestre} - {registro.materia}
            </span>
            <button onClick={() => abrirModal(registro)}>Ver Detalles</button>
          </li>
        ))}
      </ul>
      {modalAbierto && registroSeleccionado && (
        <div className="modal">
          <h3>{registroSeleccionado.materia}</h3>
          <p>Objetivo General: {registroSeleccionado.objetivoGeneral}</p>
          <p>
            Semanas de Clase:{" "}
            {registroSeleccionado.unidadesDetalle.reduce(
              (total, unidad) => total + (unidad.semanas || 0),
              0
            )}
          </p>
          <button onClick={cerrarModal}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default ListaRegistros;