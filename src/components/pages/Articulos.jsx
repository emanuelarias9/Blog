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
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <h1>No hay articulos para mostrar</h1>
      )}
    </>
  );
};
