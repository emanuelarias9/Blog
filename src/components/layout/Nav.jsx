import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/inicio">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/articulos">Articulos</NavLink>
        </li>
        <li>
          <NavLink to="/crear-articulo">Crear Articulo</NavLink>
        </li>
        <li>
          <NavLink to="/contacto">Contacto</NavLink>
        </li>
      </ul>
    </nav>
  );
};
