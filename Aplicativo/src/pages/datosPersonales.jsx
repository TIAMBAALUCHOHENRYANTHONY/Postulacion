import React, { useState } from 'react';
import '../styles/datosPersonales.css';
import FormImagen from "../images/Form-imagen.jpg"
import Logo from "../images/LogoEspe.png"
import { Link } from 'react-router-dom';

function DatosPersonales({ handleAuthentication }) {
  const handleLogin = () => {
    // lógica de autenticación
    handleAuthentication(true);
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
          <h2>Datos Personales</h2>
          <form className="form-datos">
            <label>
              Nombres Completos:
              <input type="text" />
            </label>
            <label>
              Tipo de Identificación:
              <select>
                <option value="cedula">Cédula</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
            </label>
            <label>
              Número de Identificación:
              <input type="text" />
            </label>
            <label>
              Título:
              <select>
                <option value="licenciado">Licenciado</option>
                <option value="ingeniero">Ingeniero</option>
              </select>
            </label>
            <label>
              Sexo:
              <input type="radio" name="sexo" value="masculino" /> Masculino
              <input type="radio" name="sexo" value="femenino" /> Femenino
            </label>
            <label>
              Email:
              <input type="email" />
            </label>
            <label>
              Contraseña:
              <input type="password" />
            </label>
            <div className="submit-button">
            <Link to="/escritorio" className="modal-register-button">
                Enviar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DatosPersonales;
