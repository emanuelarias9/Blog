/* eslint-disable no-unused-vars */
import { useState } from "react";

export const useForm = (obj = {}) => {
  const [form, setForm] = useState(obj);

  const serializarFormulario = (form) => {
    const formData = new FormData(form);
    const objFinal = {};
    for (let [name, value] of formData) {
      objFinal[name] = value;
    }
    return objFinal;
  };

  const enviado = (e) => {
    e.preventDefault();
    let nuevoArticulo = serializarFormulario(e.target);
    setForm(nuevoArticulo);
  };

  const cambiado = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    enviado,
    cambiado,
  };
};
