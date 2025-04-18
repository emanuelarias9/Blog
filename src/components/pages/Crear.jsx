import React from "react";

export const Crear = () => {
  return (
    <div className="jumbo">
      <h1>Crear Articulo</h1>

      <form className="formulario">
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" />
        </div>
        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea type="text" name="contenido" />
        </div>
        <div className="form-group">
          <label htmlFor="file">Imagen</label>
          <input type="file" name="file" id="file" />
        </div>
      </form>
    </div>
  );
};
