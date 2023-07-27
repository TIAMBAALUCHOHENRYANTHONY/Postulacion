import React, { useState } from 'react';
import '../styles/Cedula.css';
import FormImagen from "../images/Form-imagen.jpg"
import Logo from "../images/LogoEspe.png"
import { Link } from 'react-router-dom';


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
            <div className="submit-button">
              <Link to="/datosPersonales" className="modal-register-button">
                Enviar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { Cedula };