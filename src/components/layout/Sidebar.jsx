/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [busquedaState, setbusquedaState] = useState("");
  const [error, setError] = useState(false);
  const errorMessage = useRef("");
  const goTo = useNavigate();
  const buscar = (e) => {
    e.preventDefault();
    let busqueda = e.target.searchBar.value;
    if (busqueda.trim() === "") {
      setError(true);
      setTimeout(() => setError(false), 6000);
      errorMessage.current = "El campo de busqueda no puede estar vacio";
    } else {
      goTo(`/buscador/${busqueda}`);
    }
  };
  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={buscar}>
          <input type="text" name="searchBar" />
          {error && (
            <div className="toast-notification error">
              <p>{errorMessage.current}</p>
            </div>
          )}
          <input type="submit" id="search" value="Buscar" />
        </form>
      </div>
    </aside>
  );
};
