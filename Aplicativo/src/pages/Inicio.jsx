import React, { useState, useRef } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import "../styles/Inicio.css";
import Modal from "../components/modal";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ImagenInicio from "../images/LogoEspe.png";
import PdfViewer from "./pdf1";
import { Cedula } from "./Cedula";

function Inicio({ handleAuthentication }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleAuthentication(true);
    navigate("/home");
  };

  const navegarCedula = () => {
    navigate("/cedula");
  };

  const [showDocuments, setShowDocuments] = useState(false);
  const [showButtonText, setShowButtonText] = useState(true);

  const handleShowDocuments = () => {

    setShowDocuments(!showDocuments);

    setShowButtonText(!showButtonText);

    if (!showDocuments && refDocumentSection.current) {
      refDocumentSection.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  };

  const refDocumento1 = useRef(null);
  const refDocumento2 = useRef(null);
  const refDocumento3 = useRef(null);

  const refDocumentSection = useRef(null);

  return (
    <>
      <div className="BienvenidoInicio">
        <div className="ImagenInicio" />
        <div className="LogoEspe"></div>
        <div className="WhiteSection">
          <button className="login-button" onClick={toggle}>
            Iniciar sesión
          </button>
          <div className="text-container">
            <h1>Concurso de Méritos y Oposición<br></br>2023</h1>
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
                  <button onClick={handleLogin}>Iniciar sesión</button>
                  <button className="modal-login-button" onClick={navegarCedula}>
                    Registrarse
                  </button>
                </div>
              </div>
            </Modal>
          </div>
          <div className="container-documents">
            <button className="documents-button" onClick={handleShowDocuments}>
              {showButtonText ? "Más Información" : "Volver"}
            </button>
            {!showDocuments && (
              <div className="down-arrow" onClick={handleShowDocuments}>
              </div>
            )}
          </div>
        </div>
      </div>
      <div ref={refDocumentSection} id="pdfs">
        {showDocuments && (
          <div className="documents">
            <PdfViewer />
          </div>
        )}
      </div>
    </>
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
