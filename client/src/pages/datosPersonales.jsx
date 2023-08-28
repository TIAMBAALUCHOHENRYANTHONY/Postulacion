import React, { useState, useEffect, useRef } from 'react';
import '../styles/datosPersonales.css';
import FormImagen from "../images/Form-imagen.jpg"
import Logo from "../images/LogoEspe.png"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; // Corrected import statement
import styled from "styled-components";
import axios from "axios";
import ReactModal from "react-modal";
import "../styles/Postulacion.css";
import Axios from "axios";

export function DatosPersonales({ handleAuthentication }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCorreoModal, setShowCorreoModal] = useState(false);
  const [showCodigoModal, setShowCodigomModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const cedula = location?.state?.cedula || '';
  const emailRef = useRef();
  const nameRef = useRef();
  const tituloRef = useRef();
  const [loading, setLoading] = useState(false);
  const fechaNacPorDefecto = '2003-08-13'
  const tituloDefecto = 'Doctorado'
  const tipoIdentificacionDefecto = 'Cédula'

  const [tipoIdentifReg, setTipoIdentifReg] = useState(tipoIdentificacionDefecto);
  const [sexoReg, setSexoReg] = useState();
  const [tituloReg, setTituloReg] = useState(tituloDefecto);
  const [fechaNacReg, setFechaNacReg] = useState(fechaNacPorDefecto);
  const [correoReg, setCorreoReg] = useState();
  const [passwordReg, setPasswordReg] = useState();
  const [nombreCompleto, setNombreCompleto] = useState();
  const [nombre1Reg, setNombre1Reg] = useState();
  const [nombre2Reg, setNombre2Reg] = useState();
  const [apellido1Reg, setApellido1Reg] = useState();
  const [apellido2Reg, setApellido2Reg] = useState();
  const [userConfirmationCode, setUserConfirmationCode] = useState('');

  const generateConfirmationCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };

  const confirmationCode = generateConfirmationCode();

  const handleNombreCompletoChange = (e) => {
    const value = e.target.value;
    setNombreCompleto(value);
    const nombresArray = value.split(' ');
    setNombre1Reg(nombresArray[0] || '');
    setNombre2Reg(nombresArray[1] || '');
    setApellido1Reg(nombresArray[2] || '');
    setApellido2Reg(nombresArray[3] || '');
  };

  const register = () => {
    try {
      const response = Axios.post("http://localhost:5000/api/candidatos", {
        cand_tipo_identificacion: tipoIdentifReg,
        cand_num_identificacion: cedula,
        cand_sexo: sexoReg,
        cand_titulo: tituloReg,
        cand_fecha_nacimiento: fechaNacReg,
        cand_correo: correoReg,
        cand_password: passwordReg,
        cand_nombre1: nombre1Reg,
        cand_nombre2: nombre2Reg,
        cand_apellido1: apellido1Reg,
        cand_apellido2: apellido2Reg,
      });
      localStorage.setItem("auth", "yes");
      navigate("/home")
      handleAuthentication(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmClick = () => {
    //Validacion de correo 
    const enteredEmail = emailRef.current.value;
    const allowedDomains = ["hotmail.com", "gmail.com", "outlook.com"];
    const enteredDomain = enteredEmail.split('@')[1];

    if (!allowedDomains.includes(enteredDomain)) {
      //alert("Por favor, ingrese una dirección de correo válida (hotmail, gmail, outlook).");
      setShowCorreoModal(true);
      return;
    }

    // Show the confirmation modal
    setShowConfirmModal(true);
  };

  const handleCodigoClick = () => {
    // Show the confirmation modal
    setShowCodigomModal(true);
  };

  // Lógica de Correos
  useEffect(() => emailjs.init("v9ol_j_QrnHrLw2MK"), []); // Replace "user_your_emailjs_user_id" with your actual EmailJS user ID

  const handleSubmit = async (e) => {
    console.log(nameRef.current.value, emailRef.current.value);
    const serviceId = "service_hkqiwpk"; // Replace with your actual service ID
    const templateId = "template_3hhh20g"; // Replace with your actual template ID
    try {
      setLoading(true);
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: emailRef.current.value,
          recipient: nameRef.current.value,
          cedula: cedula,
          titulo: tituloRef.current.value,
          confirmationCode: confirmationCode,
        }
      );
      if (response.status === 200) {
        //alert("Email successfully sent, check your inbox.");
        navigate("/home");
      } else {
        console.log("Error sending email:", response.text);
        //alert("Failed to send the email. Please try again later.");
      }
    } catch (error) {
      console.log("Error sending email:", error);
      //alert("Failed to send the email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptClick = () => {
    handleCodigoClick(); // Llama a la función Codigo
    handleSubmit(); // Llama a la función handleSubmit
  };

  const handleAcceptCodigoClick = () => {
    if (userConfirmationCode === confirmationCode) {
      register();
    } else {
      alert("Código de confirmación incorrecto. Por favor, verifique.");
    }
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
                <input ref={nameRef} type="text"
                  onChange={handleNombreCompletoChange} />
              </label>
              <label>
                Tipo de Identificación:
                <select onChange={(e) => {
                  setTipoIdentifReg(e.target.value);
                }}>
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
                <select ref={tituloRef} onChange={(e) => setTituloReg(e.target.value)} defaultValue="Doctorado">
                  <option value="Doctorado">Doctorado</option>
                  <option value="Maestría">Maestría</option>
                  <option value="ingeniería/Licenciatura">Ingeniería/Licenciatura</option>
                  <option value="Tecnología">Tecnología</option>
                </select>
              </label>
              <div>
                <p>Sexo:</p>
                <label>
                  Masculino
                  <input type="radio" name="sexo" value="M"
                    onChange={(e) => {
                      setSexoReg(e.target.value);
                    }} />
                </label>
                <label>
                  Femenino
                  <input type="radio" name="sexo" value="F"
                    onChange={(e) => {
                      setSexoReg(e.target.value);
                    }} />
                </label>
              </div>
              <label>
                Email:
                <input ref={emailRef} type="email"
                  onChange={(e) => {
                    setCorreoReg(e.target.value);
                  }} />
              </label>
              <label>
                Contraseña:
                <input type="password"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }} />
              </label>
              <div className="submit-button">
                <button type="button" onClick={handleConfirmClick}>Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={showCorreoModal}
        onRequestClose={() => setShowCorreoModal(false)}
        className="mm-popup__box"
        overlayClassName="mm-popup__overlay"
        style={{
          content: {
            top: "50%", // Center the modal vertically
            left: "50%", // Center the modal horizontally
            transform: "translate(-50%, -50%)", // Center the modal both vertically and horizontally
            padding: "20px", // Add some padding
            borderRadius: "10px", // Rounded corners
            backgroundColor: "#fff", // White background
            maxWidth: "80%", // Limit the width
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1000,
          },
        }}
      >
        <div className="mm-popup__box__header">
          <h2 className="mm-popup__box__header__title">Validación de Correo </h2>
          <button
            className="mm-popup__close"
            onClick={() => setShowCorreoModal(false)}
            aria-label="Cerrar"
          >
            X
          </button>
        </div>
        <div className="mm-popup__box__body">
          <p>Correo Ingresado no válido, ingrese un correo dentro del dominio de Gamil, Hotmail, Outolook.</p>
        </div>
        <div className="mm-popup__box__footer">
          <div className="mm-popup__box__footer__right-space">
            <button className="mm-popup__btn mm-popup__btn--success" onClick={() => setShowCorreoModal(false)}>
              Aceptar
            </button>
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        className="mm-popup__box"
        overlayClassName="mm-popup__overlay"
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px", // Reduce the padding for responsiveness
            borderRadius: "10px",
            backgroundColor: "#fff",
            maxWidth: "90%", // Adjust to a higher percentage for responsiveness
            width: "auto", // Set width to auto to adjust to content
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
            <button className="mm-popup__btn mm-popup__btn--success" onClick={handleAcceptClick}>
              Aceptar
            </button>
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={showCodigoModal}
        onRequestClose={() => setShowCodigomModal(false)}
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
          <h2 className="mm-popup__box__header__title">Verificacion de Codigo</h2>
          <button
            className="mm-popup__close"
            onClick={() => setShowCodigomModal(false)}
            aria-label="Cerrar"
          >
            X
          </button>
        </div>
        <div className="mm-popup__box__body">
          <h2>Ingrese el código enviado a su correo electrónico:</h2>
          <input
            className="form-datos"
            type="text"
            value={userConfirmationCode}
            onChange={(e) => setUserConfirmationCode(e.target.value)}
          />
        </div>
        <div className="mm-popup__box__footer">
          <div className="mm-popup__box__footer__right-space">
            <button className="mm-popup__btn" onClick={() => setShowCodigomModal(false)}>
              Cancelar
            </button>
            <button className="mm-popup__btn mm-popup__btn--success" onClick={handleAcceptCodigoClick}>
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
