import React, { useState } from 'react';
import '../styles/Cedula.css';
import FormImagen from "../images/Form-imagen.jpg"
import Logo from "../images/LogoEspe.png"
import ReCAPTCHA from 'react-google-recaptcha'; // Importa el componente de reCAPTCHA

//import { useHistory } from "react-router-dom";
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


function Cedula({ handleAuthentication }) {
  const [cedula, setCedula] = useState('');
  const [cedulaValida, setCedulaValida] = useState(null);
  //const history = useHistory();
  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const esValida = validarCedula(cedula);
    
    setCedulaValida(esValida);

    if (esValida) {
      //history.push("/datosPersonales");
      handleAuthentication(true);
      
    } else {
      // Lógica para manejar la cédula inválida (opcional)
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
          <h2>Ingrese su cédula</h2>
          <form className="form-cedula"onSubmit={handleSubmit}>
            <label>
              Cedula:
              <input type="text" value={cedula} onChange={handleCedulaChange}/>
            </label>
            {cedulaValida === false && <p className="error">Cédula Inválida</p>}
            <ReCAPTCHA
              sitekey="6LcIJVQnAAAAAP7fCorE5Hjiqeo0L7Cnv7woZIo9"
              //onChange={(value) => console.log('Captcha value:', value)}
            />
            {/* Agrega aquí los otros campos del formulario si es necesario */}
            <div className="submit-button">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { Cedula };