import React from "react";
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
            <Value>Aprobado</Value> {/* Puedes cambiar esto según el estado real */}
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
