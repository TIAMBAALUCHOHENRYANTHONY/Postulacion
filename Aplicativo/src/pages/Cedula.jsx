import React, { useState } from 'react';
import '../styles/Cedula.css';
import FormImagen from "../images/Form-imagen.jpg"
import Logo from "../images/LogoEspe.png"



function Cedula({ handleAuthentication }) {
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
          <h2>Ingrese su cédula</h2>
          <form className="form-cedula">
            <label>
              Cedula:
              <input type="text" />
            </label>
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