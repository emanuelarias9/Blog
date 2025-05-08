import React, { useEffect, useRef, useState } from "react";
import { apiClientService } from "../../helpers/ApiClientService";
import { useNavigate, useParams } from "react-router-dom";
import { upladImage } from "../../helpers/UpladImage";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { checkImages } from "../../helpers/CheckImages";

export const Editar = () => {
  const { form, setForm, cambiado } = useForm({});
  const [result, setResult] = useState(false);
  const [articulo, setArticulo] = useState({});
  const [error, setError] = useState(false);
  const errorMessage = useRef("");
  const params = useParams();
  const goTo = useNavigate();
  useEffect(() => {
    obtenerArticulo();
  }, []);

  const obtenerArticulo = async () => {
    const urlPeticion = Global.urlApiBase + `/articulos/${params.id}`;
    let { apiResponse } = await apiClientService(urlPeticion, "GET");
    if (apiResponse.status === "OK") {
      setArticulo(apiResponse.articulo);
      setForm(apiResponse.articulo);
      checkImages(apiResponse.articulo, setArticulo);
    } else {
      console.error("Error al obtener el articulo " + apiResponse.mensaje);
    }
  };

  const Editar = async (e) => {
    e.preventDefault();
    let ArticuloEditado = form;
    let urlPeticion = Global.urlApiBase + "/articulos/" + params.id;
    const { apiResponse } = await apiClientService(
      urlPeticion,
      "PUT",
      ArticuloEditado
    );

    if (apiResponse.status === "OK") {
      setResult(true);
      upladImage(params.id, "#file", setError, errorMessage);
      setTimeout(() => goTo("/articulos"), 1000);
    } else {
      setResult(false);
      setError(true);
      setTimeout(() => setError(false), 5000);
      console.error(apiResponse.mensaje);
      errorMessage.current = apiResponse.mensaje;
    }
  };

  return (
    <div className="jumbo">
      <h1>Editar Articulo</h1>

      <form className="formulario" onSubmit={Editar}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            name="titulo"
            onChange={cambiado}
            defaultValue={articulo.titulo}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            type="text"
            name="contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Imagen</label>
          <div className="mask">
            {articulo.imagen != "default.png" ? (
              <img
                src={Global.urlApiBase + "/articulos/imagen/" + articulo.imagen}
                alt={articulo.titulo}
              />
            ) : (
              ""
            )}
          </div>
          <input type="file" name="file" id="file" />
        </div>
        {result && (
          <div className="form-group toast-notification success">
            <p> Articulo editado </p>
          </div>
        )}
        {error && (
          <div className="form-group toast-notification error">
            <p>{errorMessage.current}</p>
          </div>
        )}
        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};
