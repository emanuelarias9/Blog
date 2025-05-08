import { apiClientService } from "./ApiClientService";
import { Global } from "./Global";

export const checkImages = async (data, setArticulos) => {
  const articulos = Array.isArray(data) ? data : [data];
  const imagenesCorregidas = await Promise.all(
    articulos.map(async (articulo) => {
      if (articulo.imagen !== "default.png") {
        const url = `${Global.urlApiBase}/articulos/imagen/${articulo.imagen}`;
        const { apiResponse } = await apiClientService(url, "HEAD");
        if (!apiResponse.ok) {
          return { ...articulo, imagen: "default.png" };
        }
      }
      return articulo;
    })
  );
  setArticulos(
    Array.isArray(data) ? imagenesCorregidas : imagenesCorregidas[0]
  );
};
