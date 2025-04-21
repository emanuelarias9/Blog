/* eslint-disable no-unused-vars */
import React from "react";
import { Global } from "../../helpers/Global";

export const Listado = ({ articulos, setArticulos }) => {
  return articulos.map((articulo) => {
    return (
      <article key={articulo._id} className="articulo-item">
        <div className="mask">
          {articulo.imagen != "default.png" ? (
            <img
              src={Global.urlApiBase + "/articulos/imagen/" + articulo.imagen}
              alt={articulo.titulo}
            />
          ) : (
            <img
              src="https://cdn-images-1.medium.com/max/868/1*yq7TPrTheULIcxwfTD96SA.png"
              alt={articulo.titulo}
            />
          )}
        </div>
        <div className="datos">
          <h3 className="title">{articulo.titulo} </h3>
          <p className="description">{articulo.contenido} </p>

          <button className="edit">Editar</button>
          <button className="delete">Borrar</button>
        </div>
      </article>
    );
  });
};
