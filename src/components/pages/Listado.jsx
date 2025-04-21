/* eslint-disable no-unused-vars */
import React from "react";

export const Listado = ({ articulos, setArticulos }) => {
  return articulos.map((articulo) => {
    return (
      <article key={articulo._id} className="articulo-item">
        <div className="mask">
          <img
            src="https://cdn-images-1.medium.com/max/868/1*yq7TPrTheULIcxwfTD96SA.png"
            alt="Blog de React"
          />
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
