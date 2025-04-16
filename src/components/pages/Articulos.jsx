import React, { useEffect, useState } from "react";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  useEffect(() => {
    obtenerArticulos();
  }, []);

  const obtenerArticulos = async () => {
    const url = "http://localhost:3900/api/articulos";
    let peticion = await fetch(url);
    let response = await peticion.json();
    if (response.status === "Success") {
      console.log(response);
      setArticulos(response.articulos);
    } else {
      console.error("Error al cargar los articulos" + response.mensaje);
    }
  };
  return (
    <>
      {articulos.length >= 1 ? (
        articulos.map((articulo) => {
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
        })
      ) : (
        <h1>No hay articulos para mostrar</h1>
      )}
    </>
  );
};
