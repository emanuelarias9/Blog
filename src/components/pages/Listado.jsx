import React, { useEffect } from "react";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
import { apiClientService } from "../../helpers/ApiClientService";
import { checkImages } from "../../helpers/CheckImages";

export const Listado = ({ articulos, setArticulos }) => {
  useEffect(() => {
    checkImages(articulos, setArticulos);
  }, []);

  const EliminarArticulo = async (id) => {
    let urlPeticion = Global.urlApiBase + "/articulos/" + id;
    let { apiResponse } = await apiClientService(urlPeticion, "DELETE");
    if (apiResponse.status === "OK") {
      setArticulos((articulos) =>
        articulos.filter((articulo) => articulo._id !== id)
      );
    } else {
      console.error("Error al eliminar el articulo " + apiResponse.mensaje);
    }
  };
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
              src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"
              alt={articulo.titulo}
            />
          )}
        </div>
        <div className="datos">
          <h3 className="title">
            <Link to={`/articulo/${articulo._id}`}>{articulo.titulo}</Link>
          </h3>
          <p className="description">
            {articulo.contenido.length > 100
              ? articulo.contenido.slice(0, 100) + "..."
              : articulo.contenido}
          </p>

          <Link to={`/editar-articulo/${articulo._id}`} className="button edit">
            Editar
          </Link>
          <button
            className="delete"
            onClick={() => {
              EliminarArticulo(articulo._id);
            }}
          >
            Borrar
          </button>
        </div>
      </article>
    );
  });
};
