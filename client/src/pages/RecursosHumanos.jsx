
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/estilos.css';

function  RecursosHumanos({ handleAuthentication }) {

  const [solicitudes, setSolicitudes] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/solicitudes')
      .then(response => {
        setSolicitudes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener solicitudes:', error);
      });
  }, []);

  const handleAcceptClick = (id) => {
    console.log(`Aceptar clic en fila con ID ${id}`);
  };
  

  const handleRejectClick = (id) => {
    console.log(`Rechazar clic en fila con ID ${id}`);
  };


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const searchTextLower = searchText.toLowerCase();
  
    return Object.values(solicitud).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTextLower);
      }
      return false;
    });
  });
  
  const columns = [
    { field: 'checkboxSelection', headerName: '', width: 50, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_id', headerName: 'Candidato ID', width: 150 , headerClassName: 'green-header', cellClassName: 'green-cell'},
    { field: 'sol_id', headerName: 'Solicitud ID', width: 120 , headerClassName: 'green-header', cellClassName: 'green-cell'},
    
    { field: 'sol_aprobacion', headerName: 'Aprobación', width: 150, valueGetter: params => params.row.sol_aprobacion ? 'Aprobada' : 'No aprobada', headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'ofe_id', headerName: 'Oferta ID', width: 150 , headerClassName: 'green-header', cellClassName: 'green-cell'},
    { field: 'cand_nombre1', headerName: 'Nombre', width: 100 , headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_tipo_identificacion', headerName: 'Identificación', width: 150  , headerClassName: 'green-header', cellClassName: 'green-cell'},
    { field: 'cand_titulo', headerName: 'Título', width: 150  , headerClassName: 'green-header', cellClassName: 'green-cell'},
    { field: 'cand_fecha_nacimiento', headerName: 'Fecha de Nacimiento', width: 200  , headerClassName: 'green-header', cellClassName: 'green-cell'},
    { field: 'cand_sexo', headerName: 'Sexo', width: 100  , headerClassName: 'green-header', cellClassName: 'green-cell'},
    { field: 'cand_correo', headerName: 'Correo Electrónico', width: 250  , headerClassName: 'green-header', cellClassName: 'green-cell' },
    
    {
      field: 'Acciones',
      headerName: 'Acciones',
      width: 400,
      headerClassName: 'green-header',
      cellClassName: 'green-cell',
      renderCell: (params) => (
       
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAcceptClick(params.row.sol_id)}
              style={{ backgroundColor: '#009688', color: 'white' }}
            >
              Aceptar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRejectClick(params.row.sol_id)}
              style={{ backgroundColor: '#4caf50', color: 'white' }}
            >
              Rechazar
            </Button>
           
          </div>
      ),
    },
  ];

  return (
    <div className='app-container' style={{ height: 600, width: '100%' }}>
      <h1>Lista de Solicitudes</h1>
      <TextField
        id="search"
        label="Buscar"
        value={searchText}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        style={{ marginBottom: 16 }}
      />
      <DataGrid
        rows={filteredSolicitudes}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row.cand_id + '-' + row.sol_id}
        checkboxSelection
      />
    </div>
  );

 
}


export { RecursosHumanos };
