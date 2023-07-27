import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import { MyRoutes } from "./routers/routes";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import {Inicio} from "./pages/Inicio";
import { Cedula } from "./pages/Cedula.jsx";
import DatosPersonales from './pages/datosPersonales';
export const ThemeContext = React.createContext(null);


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const handleAuthentication = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <MyRoutes/>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
