import React, { useState } from "react";
import Formulario from "./components/form";
import ListaRegistros from "./components/registerList";
import "./App.css";

const App: React.FC = () => {
  const [registros, setRegistros] = useState<any[]>([]);

  const agregarRegistro = (nuevoRegistro: any) => {
    setRegistros([...registros, nuevoRegistro]);
  };

  return (
    <div className="App">
      <h1>Registro de Asignaturas</h1>
      <Formulario agregarRegistro={agregarRegistro} />
      <ListaRegistros registros={registros} />
    </div>
  );
};

export default App;