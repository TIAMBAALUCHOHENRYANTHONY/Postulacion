// Inicio.jsx
import React, { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import "../styles/Inicio.css";
import Modal from "../components/modal";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ImagenInicio from "../images/LogoEspe.png";
import { Cedula } from "./Cedula";

function Inicio({ handleAuthentication }) {
  
  const navigate = useNavigate(); 

  const handleLogin = () => {
    handleAuthentication(true);
    navigate("/home")
  };

  const [showDocuments, setShowDocuments] = useState(false);

  const handleShowDocuments = () => {
    setShowDocuments(!showDocuments);
  };

  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  };

  return (
    <div className="BienvenidoInicio">
      <div className="ImagenInicio" />
      <div className="LogoEspe"></div>
      <div className="WhiteSection">
        <button className="login-button" onClick={toggle}>
          Iniciar sesión
        </button>
        <div className="container-documents">
          <button className="documents-button" onClick={handleShowDocuments}>
            Más Informacion
          </button>
          {!showDocuments && (
            <div className="down-arrow" onClick={handleShowDocuments}></div>
          )}
        </div>
        {showDocuments && (
          <div className="documents">
            <p>Documento 1</p>
            <p>Documento 2</p>
          </div>
        )}
        <div className="text-container">
          <h1>Concurso de mérito y oposición 2023</h1>
          <Modal active={active} toggle={toggle}>
            <div className="modal-content">
              <img src={ImagenInicio} alt="Imagen Logo" className="modal-image" />
              <form className="modal-form">
                <label>
                  Usuario:
                  <input type="text" />
                </label>
                <label>
                  Contraseña:
                  <input type="password" />
                </label>
              </form>
              <div className="modal-buttons-container">
                <button className="modal-login-button" onClick={handleLogin}>
                  Iniciar sesión
                </button>
                <Link to="/cedula">Registrarse</Link>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

const StyledLink = styled(Link)`
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 4px;
`;

export { Inicio };
