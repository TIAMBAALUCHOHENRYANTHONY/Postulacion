import React, { Component } from "react";
import "../styles/pdf.css";
import { FaFilePdf } from "react-icons/fa";
import pdf1 from "../docs/pdf1.pdf";
import pdf2 from "../docs/pdf2.pdf";
import pdf3 from "../docs/pdf3.pdf";

const documents = [
  { name: "Nuestras Sedes", url: pdf1 },
  { name: "Bases del Concurso", url: pdf2 },
  { name: "Cronograma", url: pdf3 },
];

class PdfViewer extends Component {
  state = {
    selectedPdf: null,
  };

  handlePdfClick = (pdf) => {
    this.setState({ selectedPdf: pdf });
  };

  render() {
    const { selectedPdf } = this.state;

    return (
      <div>
        <div>
          {documents.map((doc) => (
            <a key={doc.name} href={doc.url} target="_blank" rel="noopener noreferrer">
              <button className="pdf-button" key={doc.name} onClick={() => this.handlePdfClick(doc.url)}>
                <FaFilePdf />  {doc.name}
              </button>
            </a>
          ))}
        </div>
        <div >
          {selectedPdf && (
            <object
              data={selectedPdf}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ position: 'relative' }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default PdfViewer;
