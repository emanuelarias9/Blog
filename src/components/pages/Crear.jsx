import React, { useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { apiClientService } from "../../helpers/ApiClientService";
import { clearForm } from "../../helpers/ClearForm";
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
    if (apiResponse.status === "Success") {
      setResult(true);
      if (document.querySelector("#file").files.length > 0) {
        subirImagen(apiResponse.articulo._id);
      }
      clearForm(".formulario", setForm);
      setTimeout(() => setResult(false), 6000);
    } else {
      setResult(false);
      setError(true);
      setTimeout(() => setError(false), 6000);
      errorMessage.current = apiResponse.mensaje;
    }
  };

  const subirImagen = async (articuloId) => {
    const fileInput = document.querySelector("#file");
    const formdata = new FormData();
    formdata.append("file", fileInput.files[0]);
    const imagen = await apiClientService(
      Global.urlApiBase + "/articulos/imagen/" + articuloId,
      "PUT",
      formdata,
      true
    );
    if (imagen.apiResponse.status != "Success") {
      errorMessage.current = imagen.apiResponse.mensaje;
      setError(true);
      setTimeout(() => setError(false), 6000);
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
