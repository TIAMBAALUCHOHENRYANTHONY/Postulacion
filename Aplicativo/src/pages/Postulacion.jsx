import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const Postulacion = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [postulacion, setPostulacion] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/postulacion");
      const data = response.data;
      setPostulaciones(data);
      if (data.length === 0) {
        console.log("Data is empty");
      } else {
        const postPeriodo = data[0]?.post_periodo;
        //console.log(postPeriodo);
        //setPostulacion(postPeriodo);
      }
      
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); 
    }
  };
  

  return (
    
    <Container>
      
      <h1>Postulacion</h1>
      
      <Form>
        <div>
          <label htmlFor="postulacion">Postulación:</label>
          <select
            id="postulacion"
            value={postulacion}
            onChange={(e) => setPostulacion(e.target.value)}
          >
            <option value="">Seleccionar</option>
            {!isLoading &&
              postulaciones.map((postulacion) => (
                <option key={postulacion.id} value={postulacion.id}>
                  {postulacion.post_periodo}
                </option>
              ))}
          </select>
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
};

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
