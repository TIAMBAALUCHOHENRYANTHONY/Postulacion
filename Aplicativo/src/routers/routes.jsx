import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { Home } from "../pages/Home";
import { Inicio } from "../pages/Inicio";
import { Cedula } from "../pages/Cedula";
import { Documentos } from "../pages/Documentos";
import { Info } from "../pages/Informacion";
import { Postulacion } from "../pages/Postulacion";
import { DatosPersonales} from "../pages/DatosPersonales";

export function MyRoutes({ handleAuthentication }) {

  const handleLogin = () => {
    // lógica de autenticación
    handleAuthentication(true);
  };

  return (
   
     
      <Routes>
        <Route path="/" element={<Inicio handleAuthentication={handleLogin}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/docs" element={<Documentos />} />
        <Route path="/postulacion" element={<Postulacion />} />
        <Route path="/info" element={<Info/>} />
        <Route path="/cedula" element={<Cedula/>} />
        <Route path="/datosPersonales" element={<DatosPersonales handleAuthentication={handleLogin}/>}/>
      </Routes>
    
  );
}
