import React, { useState } from "react";
import { RegistroAsignatura } from "../models/register";

interface ListaRegistrosProps {
  registros: RegistroAsignatura[];
}

const ListaRegistros: React.FC<ListaRegistrosProps> = ({ registros }) => {
  const [registroSeleccionado, setRegistroSeleccionado] = useState<RegistroAsignatura | null>(null);

  return (
    <div className="container mt-4">
      <h2>Registros</h2>
      <ul className="list-group">
        {registros.map((registro, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {registro.asignatura} - {registro.profesorAsignado}
            <button
              className="btn btn-info btn-sm"
              onClick={() => setRegistroSeleccionado(registro)}
            >
              Ver Detalles
            </button>
          </li>
        ))}
      </ul>
      {registroSeleccionado && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{registroSeleccionado.asignatura}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setRegistroSeleccionado(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Profesor: {registroSeleccionado.profesorAsignado}</p>
                <p>Duración: {registroSeleccionado.duracionHoras} horas</p>
                <p>Objetivo General: {registroSeleccionado.objetivoGeneral}</p>
                <h6>Unidades de Aprendizaje:</h6>
                <ul>
                  {registroSeleccionado.unidadesAprendizaje.map((unidad, idx) => (
                    <li key={idx}>
                      <strong>{unidad.nombre}</strong> - Saber: {unidad.porcentajes.saber}%, Hacer-Ser: {unidad.porcentajes.hacerSer}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaRegistros;