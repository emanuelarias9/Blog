/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { apiClientService } from "../../helpers/apiClientService";
import { Global } from "../../helpers/Global";

export const Crear = () => {
  const { form, enviado, cambiado } = useForm({});
  const [result, setResult] = useState(false);

  const Guardar = async (e) => {
    e.preventDefault();
    let nuevoArticulo = form;
    const { apiResponse, loading } = await apiClientService(
      Global.urlApiBase + "/articulos",
      "POST",
      nuevoArticulo
    );
    if (apiResponse.status === "Success") {
      setResult(true);
    } else {
      setResult(false);
      console.error("Error al guardar el articulo " + apiResponse.mensaje);
    }
  };

  return (
    <div className="jumbo">
      <h1>Crear Articulo</h1>
      <strong>{result ? "Articulo guardado" : ""}</strong>
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
        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};
