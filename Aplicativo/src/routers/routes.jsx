import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Inicio } from "../pages/Inicio";
import { Documentos } from "../pages/Documentos";
import {Info} from "../pages/Informacion";
import { Postulacion } from "../pages/Postulacion";
export function MyRoutes() {
  return (
   
     
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/docs" element={<Documentos />} />
        <Route path="/postulacion" element={<Postulacion />} />
        <Route path="/info" element={<Info/>} />
      </Routes>
    
  );
}
