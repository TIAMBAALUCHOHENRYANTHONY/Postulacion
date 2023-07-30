import styled from "styled-components";
import React, { useState } from "react";
import "../styles/Postulacion.css";
import ReactModal from "react-modal"; // Make sure you have installed this package
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AVERAGE_SHEET_SIZE = 20480; // Tamaño promedio de una hoja en bytes

export function Documentos() {
  const documentLabels = [
    "Hoja de vida formato ESPE",
    "Copia de cédula",
    "Certificado de votación",
    "Certificado de registro de título",
    "Experiencia de docente",
    "Certificado de no tener impedimento de ejercer cargo público",
    "Certificado de no tener responsabilidades administrativas",
    "Experiencia profesional",
  ];
 

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (cedulaValida && captchaValido != '') {
      console.log(cedula);
      navigate("/DatosPersonales", {state: {cedula: cedula}});
    }
  };
  const handleModalAcceptClick = () => {

    console.log("Data submitted successfully!");
    // Close the modal after submitting
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleEnviarClick = () => {
    // Check if the user has uploaded all the required documents here
    // For simplicity, let's assume that all documents are required
    const areAllDocumentsUploaded = sheetsCount.every((sheets) => sheets > 0);

    if (areAllDocumentsUploaded) {
      // Show the confirmation modal if all documents are uploaded
      setShowConfirmModal(true);
    } else {
      // Display an error message if any document is missing
      alert("Por favor, suba todos los documentos requeridos antes de enviar.");
    }
  };

  const [sheetsCount, setSheetsCount] = useState(Array(8).fill(0));

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const sheets = Math.ceil(file.size / AVERAGE_SHEET_SIZE);
      const updatedSheetsCount = [...sheetsCount];
      updatedSheetsCount[index] = sheets;
      setSheetsCount(updatedSheetsCount);
    }
  };

  return (
    <Container>
      <h1>Subir Documentos</h1>
      <Form>
        {documentLabels.map((label, index) => (
          <div key={index}>
            <label htmlFor={`file${index + 1}`}>{label}:</label>
            <input
              type="file"
              id={`file${index + 1}`}
              onChange={(e) => handleFileChange(index, e)}
            />
            {sheetsCount[index] > 0 && <p>Cantidad de hojas: {sheetsCount[index]}</p>}
          </div>
        ))}

<button type="button" onClick={handleEnviarClick}>
    Enviar
  </button>
      </Form>

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
      bottom: "45%", // Margen inferior, 5% desde la parte inferior
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
    <h2 className="mm-popup__box__header__title">Verifique los datos antes de enviar</h2>
    <button
      className="mm-popup__close"
      onClick={() => setShowConfirmModal(false)}
      aria-label="Cerrar"
    >
      X
    </button>
  </div>
  <div className="mm-popup__box__body">
    <p>
      Esta seguro que los datos enviados son los correctos, estos datos serán enviados y
      posteriormente no podrán ser modificados.
    </p>
    <p>Si envía cualquier documento de manera errónea, puede ser descalificado del concurso.</p>
  </div>
  <div className="mm-popup__box__footer">
    <div className="mm-popup__box__footer__right-space">
      <button className="mm-popup__btn" onClick={() => setShowConfirmModal(false)}>
        Cancelar
      </button>
      <button className="mm-popup__btn mm-popup__btn--success" onClick={handleModalAcceptClick}>
        Aceptar
      </button>
    </div>
  </div>
</ReactModal>
<ReactModal
        isOpen={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        className="mm-popup__box"
        overlayClassName="mm-popup__overlay"
        style={{
          content: {
            width: "40%", // Cambia el tamaño del popup a un 90% del ancho de la pantalla
            top: "15%", // Posición vertical, 5% desde la parte superior
            left: "40%", // Posición horizontal, 5% desde la izquierda
            right: "50%", // Margen derecho, 5% desde la derecha
            bottom: "50%", // Margen inferior, 5% desde la parte inferior
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
          <h2 className="mm-popup__box__header__title">Datos Subidos Correctamente</h2>
          <button
            className="mm-popup__close"
            onClick={() => setShowSuccessModal(false)}
            aria-label="Cerrar"
          >
            X
          </button>
        </div>
        <div className="mm-popup__box__body">
          <p>Tus datos se han subido correctamente. ¡Gracias por completar el proceso!</p>
        </div>
        <div className="mm-popup__box__footer">
          <div className="mm-popup__box__footer__right-space">
          <button
            className="mm-popup__btn"
            onClick={() => {
              setShowSuccessModal(false);
              navigate("/home"); // Navegar a la ruta "/home" usando useNavigate
            }}
          >
            Salir
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;

  h1 {
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
  }

  input {
    width: 100%;
  }
  button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default Documentos;
