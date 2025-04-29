export const clearForm = (selector, setForm) => {
  const formToClear = document.querySelector(selector);
  if (!formToClear) return;

  const inputs = formToClear.querySelectorAll(
    "input[type='text'],input[type='email'], textarea, input[type='file']"
  );
  const form = {};
  inputs.forEach((input) => {
    input.value = ""; // Limpiar el valor en el input form
    form[input.name] = ""; // Limpiar el valor en el objeto form
  });

  // Limpiar también el estado del form si se proporciona setForm
  if (setForm) {
    setForm(form);
  }
};
