import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cedula.css';
import FormImagen from "../images/Form-imagen.jpg"
import Logo from "../images/LogoEspe.png"
import ReCAPTCHA from 'react-google-recaptcha'; // Importa el componente de reCAPTCHA
import { Navigate, useNavigate } from "react-router-dom";

function validarCedula(cedula) {
  var cad = cedula.trim();
  var total = 0;
  var longitud = cad.length;
  var longcheck = longitud - 1;

  if (cad !== "" && longitud === 10) {
    for (let i = 0; i < longcheck; i++) {
      if (i % 2 === 0) {
        var aux = cad.charAt(i) * 2;
        if (aux > 9) aux -= 9;
        total += aux;
      } else {
        total += parseInt(cad.charAt(i));
      }
    }

    total = total % 10 ? 10 - (total % 10) : 0;

    return cad.charAt(longitud - 1) == total;
  }

  return false;
}


function Cedula({}) {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('');
  const [cedulaValida, setCedulaValida] = useState(false);
  const [captchaValido, setCaptchaValido] = useState('');

  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
    console.log(cedula);
  };

  useEffect(() => {
    setCedulaValida(validarCedula(cedula));
  }, [cedula]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cedulaValida && captchaValido != '') {
      console.log(cedula);
      navigate("/DatosPersonales", {state: {cedula: cedula}});
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={FormImagen} alt="Imagen" />
      </div>
      <div className="right-section">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="form">
          <h2>Ingrese su Cédula</h2>
          <form className="form-cedula" onSubmit={handleSubmit}>
            <label>
              Cedula:
              <input type="text" value={cedula} onChange={handleCedulaChange} />
            </label>
            {/* Muestra el mensaje de error si la cédula es inválida y el campo no está vacío */}
            {(cedula != '') ? ((cedulaValida) ? (<p></p>) : (<p>¡Valor de Cédula incorrecto!</p>)) : (<p></p>)}
            <ReCAPTCHA
              sitekey="6LcIJVQnAAAAAP7fCorE5Hjiqeo0L7Cnv7woZIo9"
            onChange={(value) => setCaptchaValido(value)}
            />
            {/* Resto del código del formulario */}
            <div className="submit-button">
              <button type="submit" className="modal-register-button">
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { Cedula };