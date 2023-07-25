// Inicio.jsx
import React, { useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import '../styles/Inicio.css';
import Modal from "../components/modal"

function Inicio({ handleAuthentication }) {
  const handleLogin = () => {
    // Aquí puedes realizar la lógica de autenticación, por ejemplo, consultando una API
    // Si la autenticación es exitosa, llama a la función para cambiar el estado a `true`
    handleAuthentication(true);
  };

  const [showDocuments, setShowDocuments] = useState(false);

  const handleShowDocuments = () => {
    setShowDocuments(!showDocuments);
  };

  const [active, setActive] = useState(false);

  const toggle = () =>{
    setActive(!active);
  }

  return (
    <div className='BienvenidoInicio'>
      <div className='ImagenInicio' />
      <div className='LogoEspe'></div>
      <div className='WhiteSection'>
        <button className='login-button' onClick={handleLogin}>Iniciar sesión</button>
        <div className='container-documents'>
          <button className='documents-button' onClick={handleShowDocuments}>Más Informacion</button>
          {!showDocuments && <div className="down-arrow" onClick={handleShowDocuments}></div>}
        </div>
        {showDocuments && (
          <div className="documents">
            <p>Documento 1</p>
            <p>Documento 2</p>
          </div>
        )}
        <div className='text-container'>
        <h1>Concurso de mérito y oposición 2023</h1>
        <button onClick={toggle}>Abrir modal</button>
        <Modal active={active} toggle={toggle}>
            <p>Modal</p>
        </Modal>
        </div>
      </div>
    </div>
  );
}

export { Inicio };
