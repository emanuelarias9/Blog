import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "../../hooks/useForm";
import { clearForm } from "../../helpers/ClearForm";

export const Contacto = () => {
  const [success, setSuccess] = useState(false);
  const { form, cambiado, setForm } = useForm({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errores, setErrores] = useState({});
  const errorMessage = useRef("");
  const contactForm = useRef();
  const sendEmail = async (e) => {
    e.preventDefault();

    // Validaciones
    const errores = {};
    if (!form.nombre) errores.nombre = true;
    if (!form.mensaje) errores.mensaje = true;
    if (!form.email) errores.email = true;

    if (Object.keys(errores).length > 0) {
      setErrores(errores);
      errorMessage.current = "debe llenar todos los campos";
      return;
    }

    setErrores({});

    contactForm.current.mensaje.value = form.mensaje + " - desde el Blog";
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        contactForm.current,
        {
          publicKey: "cxOahMqeuvqW1iH85",
        }
      );
      setSuccess(true);
      clearForm(".formulario", setForm);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      errores.emailjs = true;
      setErrores(errores);
      errorMessage.current = error;
    }
  };
  return (
    <div className="jumbo">
      <h1>Contacto</h1>
      <form ref={contactForm} className="formulario" onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            onChange={cambiado}
            className={errores.nombre ? "input-error" : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={cambiado}
            className={errores.email ? "input-error" : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            type="text"
            name="mensaje"
            onChange={cambiado}
            className={errores.mensaje ? "input-error" : ""}
          />
        </div>

        {success && (
          <div className="form-group toast-notification success">
            <p> Mensaje enviado correctamente</p>
          </div>
        )}
        {Object.keys(errores).length > 0 && (
          <div id="error" className="form-group toast-notification error">
            <p>{errorMessage.current}</p>
          </div>
        )}
        <input type="submit" value="Enviar" className="btn btn-success" />
      </form>
    </div>
  );
};
