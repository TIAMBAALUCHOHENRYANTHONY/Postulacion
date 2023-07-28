import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const Postulacion = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [postulacion, setPostulacion] = useState("");

  const [sedes, setSedes] = useState([]);
  const [sede, setSede] = useState("");

  const [departamentos, setDepartamentos] = useState([]);
  const [departamento, setDepartamento] = useState("");

  const [campo_amplios, setCampo_amplios] = useState([]);
  const [campo_amplio, setCampo_amplio] = useState("");

  const [campo_especificos, setCampo_especificos] = useState([]);
  const [campo_especifico, setCampo_especifico] = useState("");

  const [contrataciones, setContrataciones] = useState([]);
  const [contratacion, setContratacion] = useState("");

  const [personal_academicos, setPersonal_academicos] = useState([]);
  const [personal_academico, setPersonal_academico] = useState("");
  const [tablaData, setTablaData] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [campoEspecificoHabilitado, setCampoEspecificoHabilitado] = useState(false);
  const [tablaCargada, setTablaCargada] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const handleCampoAmplioChange = (e) => {
    const selectedValue = e.target.value;
    setCampo_amplio(selectedValue);

    // Habilitar el campo específico solo si se ha seleccionado un valor en el campo amplio
    setCampoEspecificoHabilitado(selectedValue !== '');
  };

  const obtenerDatosTabla = async () => {
    try {
      const queryParams = new URLSearchParams({
        postulacion,
        sede,
        departamento,
        campo_amplio,
        campo_especifico,
        contratacion,
        personal_academico
      }).toString();
      const response = await axios.get(`http://localhost:5000/tabla?${queryParams}`);
      const data = response.data;
      setTablaData(data);
      setTablaCargada(true); // Marcamos que la tabla ha sido cargada
      setShowConfirmButton(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    async function fetchCampoAmplios() {
      try {
        const response = await axios.get("http://localhost:5000/campo_amplio");
        const data = response.data;
        setCampo_amplios(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    // Obtener los datos de los campos específicos desde el servidor
    async function fetchCampoEspecificos() {
      try {
        const response = await axios.get("http://localhost:5000/campo_especifico");
        const data = response.data;
        setCampo_especificos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchCampoAmplios();
    fetchCampoEspecificos();
    fetchData();
    obtenerDatosTabla();
  }, []);

   
  //postulacion
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/postulacion");
      const data = response.data;
      setPostulaciones(data);
      if (data.length === 0) {
        console.log("Data is empty");
      } else {
        const postPeriodo = data[0]?.post_periodo;
        //console.log(postPeriodo);
        setPostulacion(postPeriodo);
      }
      
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); 
    }

    //sede
    
      try {
        const response = await axios.get("http://localhost:5000/sede");
        const data = response.data;
        setSedes(data);
        if (data.length === 0) {
          console.log("Data is empty");
        } else {
          const sedeNombre = data[0]?.sede_nombre;
          //console.log(postPeriodo);
          setSede(sedeNombre);
        }
        
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      }
    //departamento
    
      try {
        const response = await axios.get("http://localhost:5000/departamento");
        const data = response.data;
        setDepartamentos(data);
        if (data.length === 0) {
          console.log("Data is empty");
        } else {
          const departamentoNombre = data[0]?.dept_nombre;
          //console.log(postPeriodo);
          setDepartamento(departamentoNombre);
        }
        
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      }
  //campo amplio
  
    try {
      const response = await axios.get("http://localhost:5000/campo_amplio");
      const data = response.data;
      setCampo_amplios(data);
      if (data.length === 0) {
        console.log("Data is empty");
      } else {
        const campo_amplioNombre = data[0]?.ca_nombre;
        //console.log(postPeriodo);
        setCampo_amplio(campo_amplioNombre);
      }
      
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); 
    }
    //campo especifico
  
    try {
      const response = await axios.get("http://localhost:5000/campo_especifico");
      const data = response.data;
      setCampo_especificos(data);
      if (data.length === 0) {
        console.log("Data is empty");
      } else {
        const campo_especificoNombre = data[0]?.ce_nombre;
        //console.log(postPeriodo);
        setCampo_especifico(campo_especificoNombre);
      }
      
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); 
    }

    
    //contratacion
    try {
      const response = await axios.get("http://localhost:5000/contratacion");
      const data = response.data;
      setContrataciones(data);
      if (data.length === 0) {
        console.log("Data is empty");
      } else {
        const conNombre= data[0]?.con_nombre;
        //console.log(postPeriodo);
        setContratacion(conNombre);
      }
      
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); 
    }

    //personal

    try {
      const response = await axios.get("http://localhost:5000/personal_academico");
      const data = response.data;
      setPersonal_academicos(data);
      if (data.length === 0) {
        console.log("Data is empty");
      } else {
        const paNombre = data[0]?.pa_nombre;
        //console.log(postPeriodo);
        setPersonal_academico(paNombre);
      }
      
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); 
    }

  };
  

  return (
    
    <Container>
      
      <h1>Postulacion</h1>
      
      <Form>
        <div>
          <label htmlFor="postulacion">Postulación:</label>
          <select
            id="postulacion"
            value={postulacion}
            onChange={(e) => setPostulacion(e.target.value)}
          >
            <option value="" disabled>Seleccionar</option>
            {!isLoading &&
              postulaciones.map((postulacion) => (
                <option key={postulacion.id} value={postulacion.id}>
                  {postulacion.post_periodo}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="sede">Sede:</label>
          <select id="sede" value={sede} onChange={(e) => setSede(e.target.value)}>
          <option value="" disabled>Seleccionar</option>
            {sedes.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.sede_nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="departamento">Departamento:</label>
          <select id="departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
          <option value="" disabled>Seleccionar</option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.dept_nombre}
              </option>
            ))}
          </select>
        </div>

            
        

        


      <div>
          <label htmlFor="campo_amplio">Campo Amplio:</label>
          <select id="campo_amplio" value={campo_amplio} onChange={(e) => setCampo_amplio(e.target.value)}>
            <option value="">Seleccionar</option>
            {campo_amplios.map((campo_amplio) => (
              <option key={campo_amplio.id} value={campo_amplio.id}>
                {campo_amplio.ca_nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="campo_especifico">Campo Especifico:</label>
          <select id="campo_especifico" value={campo_especifico} onChange={(e) => setCampo_especifico(e.target.value)}>
            <option value="">Seleccionar</option>
            {campo_especificos.map((campo_especifico) => (
              <option key={campo_especifico.id} value={campo_especifico.id}>
                {campo_especifico.ce_nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contratacion">Tipo de Contratación:</label>
          <select id="contratacion" value={contratacion} onChange={(e) => setContratacion(e.target.value)}>
          <option value="" disabled>Seleccionar</option>
            {contrataciones.map((contratacion) => (
              <option key={contratacion.id} value={contratacion.id}>
                {contratacion.con_nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="personal_academico">Tipo de Personal Académico:</label>
          <select id="personal_academico" value={personal_academico} onChange={(e) => setPersonal_academico(e.target.value)}>
          <option value="" disabled>Seleccionar</option>
            {personal_academicos.map((personal_academico) => (
              <option key={personal_academico.id} value={personal_academico.id}>
                {personal_academico.pa_nombre}
              </option>
            ))}
          </select>
        </div>

      

        <button onClick={(e) => { e.preventDefault(); obtenerDatosTabla(); }}>Enviar</button>
        


      </Form>
{/* Tabla */}
{tablaCargada && (
        <table>
          <thead>
            <tr>
              <th>Vacantes</th>
              <th>Horas</th>
              <th>Actividad</th>
            </tr>
          </thead>
          <tbody>
            {tablaData.length === 0 ? (
              <tr>
                <td colSpan="3">No hay datos disponibles</td>
              </tr>
            ) : (
              tablaData.map((dato, index) => (
                <tr key={index}>
                  <td>{dato.ofe_vacantes}</td>
                  <td>{dato.ofe_horas}</td>
                  <td>{dato.act_nombre}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
{tablaCargada && tablaData.length > 0 && showConfirmButton && (
        <button onClick={() => handleConfirmClick()}>Confirmar</button>
      )}
    </Container>
    
  );
};

const Container = styled.div`

  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 900px; /* Ancho del formulario */
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;

  h1 {
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
  }

  select,
  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 10px;

  /* Alinear los elementos en la misma línea */
  div {
    display: flex;
    flex-direction: column;
  }
  
  div:last-child {
    flex: 1;
  }
`;

export default Postulacion;
