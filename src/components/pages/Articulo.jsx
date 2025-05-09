import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { apiClientService } from "../../helpers/ApiClientService";
import { useParams } from "react-router-dom";
import { checkImages } from "../../helpers/CheckImages";

export const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    obtenerArticulo();
  }, []);

  const obtenerArticulo = async () => {
    const urlPeticion = Global.urlApiBase + `/articulos/${params.id}`;
    let { apiResponse, loading } = await apiClientService(urlPeticion, "GET");
    if (apiResponse.status === "OK") {
      setArticulo(apiResponse.articulo);
      checkImages(apiResponse.articulo, setArticulo);
    } else {
      console.error("Error al obtener el articulo " + apiResponse.mensaje);
    }
    setLoading(loading);
  };
  return (
    <div className="articulo-detalle">
      {loading ? (
        <h1>Cargando...</h1>
      ) : articulo ? (
        <>
          <div className="mask">
            {articulo.imagen != "default.png" ? (
              <img
                src={Global.urlApiBase + "/articulos/imagen/" + articulo.imagen}
                alt={articulo.titulo}
              />
            ) : (
              <img
                src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
                alt={articulo.titulo}
              />
            )}
          </div>
          <div className="datos">
            <div className="title-date">
              <h3 className="title-articulo">{articulo.titulo}</h3>
              <span className="date">
                Fecha de publicación:{" "}
                {new Date(articulo.fecha).toLocaleDateString("es-ES")}
              </span>
            </div>
            <p className="description">{articulo.contenido}</p>
          </div>
        </>
      ) : (
        <h1>No hay artículos para mostrar</h1>
      )}
    </div>
  );
};
