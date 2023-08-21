import React, { useState, useRef } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import "../styles/Inicio.css";
import Modal from "../components/modal";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ImagenInicio from "../images/LogoEspe.png";
import PdfViewer from "./pdf1";
import { Cedula } from "./Cedula";
import Axios from "axios";

function Inicio({ handleAuthentication }) {
  const navigate = useNavigate();
  const [cedulaLog, setCedulaLog] = useState("");
  const [contraseñaLog, setContraseñaLog] = useState("");
  const [usuarioRechu, setCedulaRechu] = useState("");
  const [contraseñaRechu, setContraseñaRechu] = useState("");

  const [loginStatus, setLoginStatus] = useState(""); 

  const log = () => {
    // Intentar inicio de sesión para Recursos Humanos
    Axios.post("http://localhost:5000/api/login_recursos_humanos", {
      rh_correo: usuarioRechu,
      rh_password: contraseñaRechu,
    }).then((response) => {
      if (response.data && response.data.length > 0) {
        navigate("/recursosHumanos");
        localStorage.setItem("Cargo", "recursos_H")
      } else {
        // Intentar inicio de sesión para Candidatos si no es Recursos Humanos
        Axios.post("http://localhost:5000/api/login_candidatos", {
          cand_num_identificacion: cedulaLog,
          cand_password: contraseñaLog,
        }).then((candidatoResponse) => {
          if (candidatoResponse.data.message) {
            setLoginStatus(candidatoResponse.data.message);
          } else if (candidatoResponse.data && candidatoResponse.data.length > 0) {
            const cand_num_identificacion = candidatoResponse.data[0].cand_num_identificacion;
            setLoginStatus("Bienvenido Candidato: " + cand_num_identificacion);
            localStorage.setItem("auth", "yes");
            localStorage.setItem("cand_num_identificacion", cand_num_identificacion);
            handleAuthentication(true);
            navigate("/home");
          } else {
            setLoginStatus("Usuario o contraseña incorrecta");
          }
        });
      }
    });
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
                    Cedula:
                    <input type="text"  
                    onChange={(e) => {
                      setCedulaLog(e.target.value);
                      setCedulaRechu(e.target.value);
                    }}/>
                  </label>
                  <label>
                    Contraseña:
                    <input type="password"
                    onChange={(e) => {
                      setContraseñaLog(e.target.value);
                      setContraseñaRechu(e.target.value);
                    }} />
                  </label>
                </form>
                <div className="modal-buttons-container">
                  <button onClick={log}>Iniciar sesión</button>
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
            {!showDocuments ? (
              <div className="down-arrow" onClick={handleShowDocuments} />
            ) : (
              <div
                className="up-arrow down-arrow"
                style={{ transform: "rotate(315deg)" }}
                onClick={handleShowDocuments}
              />
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
