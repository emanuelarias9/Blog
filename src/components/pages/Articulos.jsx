import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { apiClientService } from "../../helpers/ApiClientService";
import { Listado } from "./Listado";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    obtenerArticulos();
  }, []);

  const obtenerArticulos = async () => {
    const urlPeticion = Global.urlApiBase + "/articulos";
    let { apiResponse, loading } = await apiClientService(urlPeticion, "GET");
    if (apiResponse.status === "OK") {
      setArticulos(apiResponse.articulos);
    } else {
      console.error("Error al cargar los articulos " + apiResponse.mensaje);
    }
    setLoading(loading);
  };
  return (
    <>
      {loading ? (
        <div className="jumbo">
          <h1>Cargando...</h1>
          <br />
          <h2>
            si notas la carga lenta es por que la app esta desplegada en un
            server gratuito lo cual hace que cada vez que el server se "duerme"
            por inactividad todas las imagenes se eliminen y la proxima accion
            "despierta" al server lo cual toma aproximadamente 50 segundos
          </h2>
        </div>
      ) : articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <div className="jumbo">
          <h1>No hay articulos para mostrar</h1>
        </div>
      )}
    </>
  );
};
