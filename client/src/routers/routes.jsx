import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import { Inicio } from "../pages/Inicio";
import { Cedula } from "../pages/Cedula";
import { Documentos } from "../pages/Documentos";
import { Info } from "../pages/Informacion";
import { Postulacion } from "../pages/Postulacion";
import { DatosPersonales} from "../pages/DatosPersonales";
import { Home } from "../pages/Home";
import Pdf from "../pages/pdf1";
import Pdf1 from "../pages/pdf1";
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
        <Route path="/home" element={<Home/>} />
        <Route path="/pdf1" element={<Pdf1/>} />
      </Routes>
    
  );
}