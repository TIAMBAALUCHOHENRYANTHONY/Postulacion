import React, { useState } from 'react';
import '../styles/datosPersonales.css';
import FormImagen from "../images/Form-imagen.jpg"
import Logo from "../images/LogoEspe.png"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";

import axios from "axios";
import ReactModal from "react-modal";
import "../styles/Postulacion.css";


export function DatosPersonales({ handleAuthentication }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cedula = location?.state?.cedula || '';

  const handleLogin = () => {
    handleAuthentication(true);
    navigate("/home")
  };

  const handleConfirmClick = () => {
    // Show the confirmation modal
    setShowConfirmModal(true);
  };
  

  return (
    <Container>
    
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
              <input type="text" placeholder={cedula} disabled />
            </label>
            <label>
              Máximo Título Alcanzado:
              <select>
                <option value="licenciado">Doctorado</option>
                <option value="ingeniero">Maestría</option>
                <option value="ingeniero">Ingeniería/Licencuiatura</option>
                <option value="ingeniero">Tecnología</option>
              </select>
            </label>

            <div>
              <p>Sexo:</p>
              <label>
                Masculino
                <input type="radio" name="sexo" value="masculino" />
              </label>
              <label>
                Femenino
                <input type="radio" name="sexo" value="femenino" />
              </label>
            </div>
            <label>
              Email:
              <input type="email" />
            </label>
            <label>
              Contraseña:
              <input type="password" />
            </label>
            <div className="submit-button">
              

            <button type="button" onClick={() => {
  setShowConfirmModal(true);
  handleConfirmClick();
}}>Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ReactModal
  isOpen={showConfirmModal}
  onRequestClose={() => setShowConfirmModal(false)}
  className="mm-popup__box"
  overlayClassName="mm-popup__overlay"
  style={{
    content: {
      width: "40%", // Cambia el tamaño del popup a un 90% del ancho de la pantalla
      top: "15%", // Posición vertical, 5% desde la parte superior
      left: "40%", // Posición horizontal, 5% desde la izquierda
      right: "50%", // Margen derecho, 5% desde la derecha
      bottom: "25%", // Margen inferior, 5% desde la parte inferior
      padding: "50px", // Agrega espacio interno de 20px
      borderRadius: "10px", // Añade bordes redondeados
      backgroundColor: "#fff", // Fondo del popup en blanco
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 1000,
    },
  }}
>
  <div className="mm-popup__box__header">
    <h2 className="mm-popup__box__header__title">Terminos y Condiciones</h2>
    <button
      className="mm-popup__close"
      onClick={() => setShowConfirmModal(false)}
      aria-label="Cerrar"
    >
      X
    </button>
  </div>
  <div className="mm-popup__box__body">
  <h2>Política de Privacidad</h2>
  <p>La Universidad de las Fuerzas Armadas ESPE garantiza la confidencialidad de los datos personales de los candidatos y se compromete a no divulgar ni compartir esta información con terceros sin el consentimiento expreso de los interesados, excepto en los casos requeridos por la ley.</p>

  
  <h3>Cambios en la Política de Privacidad:</h3>
  <p>La política de protección de datos de la Universidad de las Fuerzas Armadas ESPE podrá ser modificada en el futuro. En caso de que se realicen cambios significativos, se notificará a los candidatos y se solicitará nuevamente su consentimiento, si es necesario.</p>

  
  <p>Al participar en el proceso de postulación y contratación de personal docente en la Universidad de las Fuerzas Armadas ESPE, los candidatos aceptan y se comprometen a cumplir con estos términos y condiciones en relación con la protección de sus datos personales.</p>

    </div>
  <div className="mm-popup__box__footer">
    <div className="mm-popup__box__footer__right-space">
      <button className="mm-popup__btn" onClick={() => setShowConfirmModal(false)}>
        Cancelar
      </button>
      <button className="mm-popup__btn mm-popup__btn--success" onClick={handleLogin}>
        Aceptar
      </button>
    </div>
  </div>
</ReactModal>
   
    </Container>
  );
}
const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default DatosPersonales;
