import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { apiClientService } from "../../helpers/apiClientService";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    obtenerArticulos();
  }, []);

  const obtenerArticulos = async () => {
    const urlPeticion = Global.urlApiBase + "/articulos";
    let { apiResponse, loading } = await apiClientService(urlPeticion, "GET");
    if (apiResponse.status === "Success") {
      setArticulos(apiResponse.articulos);
    } else {
      console.error("Error al cargar los articulos " + apiResponse.mensaje);
    }
    setLoading(loading);
  };
  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : articulos.length >= 1 ? (
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
