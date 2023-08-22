import styled from "styled-components";
import hojaDeVidaPDF from "../assets/pdf1.pdf";
import certificadoExperienciaDocentePDF from "../assets/pdf2.pdf";
import certificadoExperienciaProfesionalPDF from "../assets/pdf3.pdf";

export function Info() {
  return (
    <Container>
      <h1>Información y Formatos</h1>
      <FormatosContainer>
        <Formato>
          <h3>Hoja de Vida Formato ESPE</h3>
          <a href={hojaDeVidaPDF} download>
            <img src="https://icones.pro/wp-content/uploads/2021/04/icone-excel-vert.png" alt="EXCEL" />
          </a>
        </Formato>
        <Formato>
          <h3>Certificados de Experiencia Profesional Docente</h3>
          <a href={certificadoExperienciaDocentePDF} download>
            <img src="https://icones.pro/wp-content/uploads/2022/06/icone-microsoft-word-bleu.png" alt="WORD" />
          </a>
          <a href={certificadoExperienciaDocentePDF} download>
            <img src="https://icones.pro/wp-content/uploads/2021/03/icone-pdf-symbole-png-rouge.png" alt="PDF" />        
          </a>
        </Formato>
        <Formato>
          <h3>Certificados experiencia Profesional</h3>
          <a href={certificadoExperienciaProfesionalPDF} download>
            <img src="https://icones.pro/wp-content/uploads/2022/06/icone-microsoft-word-bleu.png" alt="WORD" />
          </a>
          <a href={certificadoExperienciaProfesionalPDF} download>
            <img src="https://icones.pro/wp-content/uploads/2021/03/icone-pdf-symbole-png-rouge.png" alt="PDF" />   
          </a>
        </Formato>
      </FormatosContainer>
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

const FormatosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Formato = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 10px;
  }
`;
