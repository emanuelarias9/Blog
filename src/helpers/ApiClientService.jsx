export const apiClientService = async (
  urlPeticion,
  method = "GET",
  data = null,
  file = false
) => {
  let peticion;
  let loading = true;
  let apiResponse;

  if (method === "HEAD") {
    peticion = await fetch(urlPeticion, {
      method: method,
    });
    apiResponse = peticion;
    loading = false;
    return { apiResponse, loading };
  }

  if (method === "GET" || method === "DELETE") {
    peticion = await fetch(urlPeticion, {
      method: method,
    });
    apiResponse = await peticion.json();
    loading = false;
    return { apiResponse, loading };
  }

  if (file && (method === "PUT" || method === "POST")) {
    peticion = await fetch(urlPeticion, {
      method: method,
      body: data,
    });
    apiResponse = await peticion.json();
    loading = false;
    return { apiResponse, loading };
  }

  if (!file && (method === "PUT" || method === "POST")) {
    peticion = await fetch(urlPeticion, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    apiResponse = await peticion.json();
    loading = false;
    return { apiResponse, loading };
  }
};
