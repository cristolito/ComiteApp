import React, { useState, useEffect } from "react";
import Formulario from "./components/form";
import ListaRegistros from "./components/registerList";
import { RegistroAsignatura } from "./models/register";

const App: React.FC = () => {
  // Cargar registros desde localStorage al iniciar la aplicación
  const cargarRegistros = (): RegistroAsignatura[] => {
    const registrosGuardados = localStorage.getItem("registros");
    return registrosGuardados ? JSON.parse(registrosGuardados) : [];
  };

  // Estado para almacenar los registros
  const [registros, setRegistros] = useState<RegistroAsignatura[]>(cargarRegistros);

  // Guardar registros en localStorage cada vez que se actualice el estado
  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);

  // Función para agregar un nuevo registro
  const agregarRegistro = (registro: RegistroAsignatura) => {
    setRegistros((prevRegistros) => [...prevRegistros, registro]);
  };

  return (
    <div className="container">
      <h1 className="my-4">Registro de Asignaturas</h1>
      <Formulario agregarRegistro={agregarRegistro} />
      <ListaRegistros registros={registros} />
    </div>
  );
};

export default App;