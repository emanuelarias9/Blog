import React, { useEffect, useRef, useState } from "react";
import { Global } from "../../helpers/Global";
import { apiClientService } from "../../helpers/ApiClientService";
import { Listado } from "./Listado";
import { useParams } from "react-router-dom";

export const Busqueda = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const errorMessage = useRef("");
  useEffect(() => {
    obtenerArticulos();
  }, [params]);

  const obtenerArticulos = async () => {
    const urlPeticion =
      Global.urlApiBase +
      "/articulos?titulo=" +
      params.busqueda +
      "&contenido=" +
      params.busqueda;
    let { apiResponse, loading } = await apiClientService(urlPeticion, "GET");
    if (apiResponse.status === "Success") {
      setArticulos(apiResponse.articulos);
    } else {
      setArticulos([]);
      errorMessage.current = apiResponse.mensaje;
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
        <h1>{errorMessage.current}</h1>
      )}
    </>
  );
};
