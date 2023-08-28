import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
`;
const nombre = localStorage.getItem("nombre_candidato");
const apellido = localStorage.getItem("apellido_candidato");
const cedula = localStorage.getItem("cand_num_identificacion");
const email = localStorage.getItem("email");

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Value = styled.div`
  color: #333;
`;

export function Estado() {
  const [estado, setEstado] = useState("Pendiente");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id_candidato");
    
    // Hacer la llamada a la API para obtener el estado de la solicitud
    fetch(`http://localhost:5000/solicitudes/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data && data[0]) {
          setEstado(data[0].sol_aprobacion);
          setNombre(data[0].cand_nombre1);
          setApellido(data[0].cand_apellido1);
          setCedula(data[0].cand_num_identificacion);
          setEmail(data[0].cand_correo);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container>
      <h2>Estado de Postulación</h2>
      <CardContainer>
        <LeftColumn>
        <Field>
            <Label>Nombre:</Label>
            <Value>{nombre} {apellido}</Value>
          </Field>
          <Field>
            <Label>Cédula:</Label>
            <Value>{cedula}</Value>
          </Field>
          <Field>
            <Label>Email:</Label>
            <Value>{email}</Value>
          </Field>
          
        </LeftColumn>
        <RightColumn>
          <Field>
            <Label>Estado de Postulación:</Label>
            <Value>{estado ? "Aprobado" : "Pendiente"}</Value>{/* Puedes cambiar esto según el estado real */}
          </Field>
        </RightColumn>
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
`;
