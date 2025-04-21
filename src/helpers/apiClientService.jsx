export const apiClientService = async (
  urlPeticion,
  method = "GET",
  data = null,
  file = false
) => {
  let peticion;
  let loading = true;
  if (method === "GET") {
    peticion = await fetch(urlPeticion);
  } else {
    if (file) {
      peticion = await fetch(urlPeticion, {
        method: method,
        body: data,
      });
    } else {
      peticion = await fetch(urlPeticion, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  }

  let apiResponse = await peticion.json();
  loading = false;
  return { apiResponse, loading };
};
