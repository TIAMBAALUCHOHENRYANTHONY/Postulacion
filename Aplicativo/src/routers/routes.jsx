import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Inicio } from "../pages/Inicio";
import { Cedula } from "../pages/cedula";
import { Documentos } from "../pages/Documentos";
import {Info} from "../pages/Informacion";
import { Postulacion } from "../pages/Postulacion";
import DatosPersonales from "../pages/datosPersonales";
import  Escritorio  from "../pages/escritorio"

export function MyRoutes() {
  return (
   
     
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/docs" element={<Documentos />} />
        <Route path="/postulacion" element={<Postulacion />} />
        <Route path="/info" element={<Info/>} />
        <Route path="/cedula" element={<Cedula/>} />
        <Route path="/datosPersonales" element={<DatosPersonales/>}/>
        <Route path="/escritorio" element={<Escritorio/>}/>
      </Routes>
    
  );
}
