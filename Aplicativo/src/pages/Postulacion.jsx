import styled from "styled-components";
import React, { useState } from "react";

export function Postulacion() {
  return (
    <Container>
      <h1>Postulacion</h1>
      <Form>
        <div>
          <label htmlFor="postulacion">Postulación:</label>
          <select id="postulacion">{/* Agregar opciones para la postulación */}</select>
        </div>

        <div>
          <label htmlFor="tipoContratacion">Tipo de Contratación:</label>
          <select id="tipoContratacion">{/* Agregar opciones para el tipo de contratación */}</select>
        </div>

        <div>
          <label htmlFor="tipoPersonalAcademico">Tipo de Personal Académico:</label>
          <select id="tipoPersonalAcademico">{/* Agregar opciones para el tipo de personal académico */}</select>
        </div>

        <HorizontalContainer>
          <div>
            <label htmlFor="vacantes">Vacantes:</label>
            <input type="text" id="vacantes" />
          </div>

          <div>
            <label htmlFor="tiempo">Tiempo:</label>
            <input type="text" id="tiempo" />
          </div>

          <div>
            <label htmlFor="campoAmplio">Campo Amplio:</label>
            <input type="text" id="campoAmplio" />
          </div>
        </HorizontalContainer>

        <HorizontalContainer>
          <div>
            <label htmlFor="campoEspecifico">Campo Específico:</label>
            <input type="text" id="campoEspecifico" />
          </div>

          <div>
            <label htmlFor="sede">Sede:</label>
            <input type="text" id="sede" />
          </div>

          <div>
            <label htmlFor="departamento">Departamento:</label>
            <input type="text" id="departamento" />
          </div>
        </HorizontalContainer>

        <button>Enviar</button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  height: 50vh;
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

  select,
  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
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

const HorizontalContainer = styled.div`
  display: flex;
  gap: 10px;

  /* Alinear los elementos en la misma línea */
  div {
    display: flex;
    flex-direction: column;
  }
  
  div:last-child {
    flex: 1;
  }
`;

export default Postulacion;

/*

import React, { useState } from "react";
import styled from "styled-components";

const Postulacion = () => {
  const [postulacion, setPostulacion] = useState("");
  const [tipoContratacion, setTipoContratacion] = useState("");
  const [tipoPersonalAcademico, setTipoPersonalAcademico] = useState("");
  const [vacantes, setVacantes] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [campoAmplio, setCampoAmplio] = useState("");
  const [campoEspecifico, setCampoEspecifico] = useState("");
  const [sede, setSede] = useState("");
  const [departamento, setDepartamento] = useState("");

  // Lógica para enviar los datos del formulario al servidor

  return (
    <Container>
      <Form>
        <h1>Postulacion</h1>

        <div>
          <label htmlFor="postulacion">Postulación:</label>
          <select
            id="postulacion"
            value={postulacion}
          //onChange={(e) => setPostulacion(e.target.value)}
          >
            <option value="">Seleccionar</option>
            {/ Agregar opciones para la postulación /}
            </select>
            </div>
    
            <div>
              <label htmlFor="tipoContratacion">Tipo de Contratación:</label>
              <select
                id="tipoContratacion"
                value={tipoContratacion}
              //onChange={(e) => setTipoContratacion(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {/ Agregar opciones para el tipo de contratación /}
              </select>
            </div>
    
            <div>
              <label htmlFor="tipoPersonalAcademico">Tipo de Personal Académico:</label>
              <select
                id="tipoPersonalAcademico"
                value={tipoPersonalAcademico}
              //onChange={(e) => setTipoPersonalAcademico(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {/ Agregar opciones para el tipo de personal académico /}
              </select>
            </div>
    
            <div>
              <label htmlFor="vacantes">Vacantes:</label>
              <input
                type="text"
                id="vacantes"
                value={vacantes}
              //onChange={(e) => setVacantes(e.target.value)}
              />
            </div>
    
            <div>
              <label htmlFor="tiempo">Tiempo:</label>
              <input
                type="text"
                id="tiempo"
                value={tiempo}
              //onChange={(e) => setTiempo(e.target.value)}
              />
            </div>
    
            <div>
              <label htmlFor="campoAmplio">Campo Amplio:</label>
              <input
                type="text"
                id="campoAmplio"
                value={campoAmplio}
              //onChange={(e) => setCampoAmplio(e.target.value)}
              />
            </div>
    
            <div>
              <label htmlFor="campoEspecifico">Campo Específico:</label>
              <input
                type="text"
                id="campoEspecifico"
                value={campoEspecifico}
              //onChange={(e) => setCampoEspecifico(e.target.value)}
              />
            </div>
    
            <div>
              <label htmlFor="sede">Sede:</label>
              <input type="text" id="sede" value={sede} onChange={(e) => setSede(e.target.value)} />
            </div>
    
            <div>
              <label htmlFor="departamento">Departamento:</label>
              <input
                type="text"
                id="departamento"
                value={departamento}
              //onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>
    
            <button>Enviar</button>
          </Form>
        </Container>
      );
    };
    
    const Container = styled.div`
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `;
    
    const Form = styled.form`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      width: 300px;
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 5px;
    
      label {
        font-weight: bold;
      }
    
      select,
      input {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
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
    
    export default Postulacion;

*/