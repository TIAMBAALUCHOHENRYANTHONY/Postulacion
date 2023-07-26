import styled from "styled-components";
import React, { useState } from "react";

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

        <button>Enviar</button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 900px; /* Ancho del formulario */
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
