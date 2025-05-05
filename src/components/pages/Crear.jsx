import React, { useRef, useState } from "react";
import { apiClientService } from "../../helpers/ApiClientService";
import { upladImage } from "../../helpers/UpladImage";
import { clearForm } from "../../helpers/ClearForm";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export const Crear = () => {
  const { form, cambiado, setForm } = useForm({ titulo: "", contenido: "" });
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);
  const errorMessage = useRef("");

  const Guardar = async (e) => {
    e.preventDefault();
    let nuevoArticulo = form;
    const { apiResponse } = await apiClientService(
      Global.urlApiBase + "/articulos",
      "POST",
      nuevoArticulo
    );
    if (apiResponse.status === "OK") {
      setResult(true);
      upladImage(apiResponse.articulo._id, "#file", setError, errorMessage);
      clearForm(".formulario", setForm);
      setTimeout(() => setResult(false), 6000);
    } else {
      setResult(false);
      setError(true);
      setTimeout(() => setError(false), 6000);
      errorMessage.current = apiResponse.mensaje;
    }
  };

  return (
    <div className="jumbo">
      <h1>Crear Articulo</h1>
      <form className="formulario" onSubmit={Guardar}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" onChange={cambiado} />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea type="text" name="contenido" onChange={cambiado} />
        </div>
        <div className="form-group">
          <label htmlFor="file">Imagen</label>
          <input type="file" name="file" id="file" />
        </div>
        {result && (
          <div className="form-group toast-notification success">
            <p> Articulo creado </p>
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
