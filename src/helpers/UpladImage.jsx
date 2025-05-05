import { apiClientService } from "./ApiClientService";
import { Global } from "./Global";
export const upladImage = async (
  articuloId,
  inputSelector,
  setError,
  errorMessageRef
) => {
  const fileInput = document.querySelector(inputSelector);
  if (!fileInput || fileInput.files.length === 0) return;

  const formdata = new FormData();
  formdata.append("file", fileInput.files[0]);
  const imagen = await apiClientService(
    `${Global.urlApiBase}/articulos/imagen/${articuloId}`,
    "PUT",
    formdata,
    true
  );

  if (imagen.apiResponse.status !== "OK") {
    errorMessageRef.current = imagen.apiResponse.mensaje;
    setError(true);
  }
};
