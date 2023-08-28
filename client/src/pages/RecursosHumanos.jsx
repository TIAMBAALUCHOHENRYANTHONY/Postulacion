import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../styles/estilos.css';
import { Sidebar } from "../components/SidebarRH";
import { Typography } from '@mui/material';

function RecursosHumanos({ handleAuthentication }) {

  const [solicitudes, setSolicitudes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [pdfs, setPdfs] = useState([]);

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
    // Llamar al endpoint para aprobar la solicitud
    axios.put(`http://localhost:5000/solicitudes/${id}/aprobar`)
      .then(response => {
        console.log('Solicitud aprobada exitosamente');
        // Actualizar el estado local para reflejar el cambio
        const updatedSolicitudes = solicitudes.map(solicitud => {
          if (solicitud.sol_id === id) {
            return { ...solicitud, sol_aprobacion: true };
          }
          return solicitud;
        });
        setSolicitudes(updatedSolicitudes);
      })
      .catch(error => {
        console.error('Error al aprobar la solicitud:', error);
      });
  };

  const handleRejectClick = (id) => {
    // Llamar al endpoint para rechazar la solicitud
    axios.put(`http://localhost:5000/solicitudes/${id}/rechazar`)
      .then(response => {
        console.log('Solicitud rechazada exitosamente');
        // Actualizar el estado local para reflejar el cambio
        const updatedSolicitudes = solicitudes.map(solicitud => {
          if (solicitud.sol_id === id) {
            return { ...solicitud, sol_aprobacion: false };
          }
          return solicitud;
        });
        setSolicitudes(updatedSolicitudes);
      })
      .catch(error => {
        console.error('Error al rechazar la solicitud:', error);
      });
  };




  const handleViewClick = (id) => {
    const selected = solicitudes.find(solicitud => solicitud.sol_id === id);
    setSelectedSolicitud(selected);
    setIsModalOpen(true);
    console.log(id);
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
  //de aqui va la logica de los bonotes de descarga 
  const handleDocumentDownload = (cand_id, tipoDoc) => {
    axios.get(`http://localhost:5000/documentos/${cand_id}/${tipoDoc}`)
      .then(response => {
        //console.log(response.data[0].pdfPath)
        const archivo = response.data[0].pdfPath;
        const pdfPath = archivo.split('\\');
        const pdfName = 'http://localhost:5000/uploads/' + pdfPath[pdfPath.length - 1];
        console.log(pdfName);
        //const blob = new Blob([response.data[0].pdfPath], { type: 'application/pdf' });
        //const url = window.URL.createObjectURL(blob);
        //console.log(url);
        //setPdfs([...pdfs, url]);
        window.open(pdfName, '_blank');
      })
      .catch(error => {
        console.error('Error al descargar el documento:', error);
      });
  };

  const columns = [
    { field: 'checkboxSelection', headerName: '', width: 50, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_id', headerName: 'Candidato ID', width: 150, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'sol_id', headerName: 'Solicitud ID', width: 120, headerClassName: 'green-header', cellClassName: 'green-cell' },

    { field: 'sol_aprobacion', headerName: 'Aprobación', width: 150, valueGetter: params => params.row.sol_aprobacion ? 'Aprobada' : 'No aprobada', headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'ofe_id', headerName: 'Oferta ID', width: 150, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_nombre1', headerName: 'Nombre', width: 100, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_tipo_identificacion', headerName: 'Identificación', width: 150, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_num_identificacion', headerName: 'Cedula', width: 150, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_titulo', headerName: 'Título', width: 150, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_fecha_nacimiento', headerName: 'Fecha de Nacimiento', width: 200, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_sexo', headerName: 'Sexo', width: 100, headerClassName: 'green-header', cellClassName: 'green-cell' },
    { field: 'cand_correo', headerName: 'Correo Electrónico', width: 250, headerClassName: 'green-header', cellClassName: 'green-cell' },

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
          <Button
            variant="contained"
            onClick={() => handleViewClick(params.row.sol_id)}
            style={{ backgroundColor: '#8bc34a', color: 'white' }}
          >
            Ver Información
          </Button>

        </div>
      ),
    },
  ];

  const handleCloseModal = () => {
    setSelectedSolicitud(null);
    setIsModalOpen(false);
  };



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

      <Modal marginLeft open={isModalOpen} onClose={handleCloseModal} className="modal-container">
        <Box className="modal-content" >
          {selectedSolicitud && (
            <div>
              <h2>Detalles de Postulante</h2>
              <p>Candidato ID: {selectedSolicitud.cand_id}</p>
              <p>Solicitud ID: {selectedSolicitud.sol_id}</p>
              <p>Nombre: {selectedSolicitud.cand_nombre1}</p>
              <p>Apellido: {selectedSolicitud.cand_apellido1}</p>
              <p>Cedula: {selectedSolicitud.cand_num_identificacion}</p>
              <p>Correo Electrónico: {selectedSolicitud.cand_correo}</p>

              <h2>Documentos </h2>
              <List style={{ width: '100%' }}>
                <ListItem >
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontFamily: 'Century Gothic', fontSize: '16px' }}>
                        Hoja de vida
                      </Typography>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SimCardDownloadIcon />}
                    onClick={() => handleDocumentDownload(selectedSolicitud.cand_id, 'Hoja de vida formato ESPE')}
                  >

                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontFamily: 'Century Gothic', fontSize: '16px' }}>
                        Copia de cédula
                      </Typography>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SimCardDownloadIcon />}
                    onClick={() => handleDocumentDownload(selectedSolicitud.cand_id, 'Copia de cédula')}
                  >

                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontFamily: 'Century Gothic', fontSize: '16px' }}>
                        Certificado de votación
                      </Typography>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SimCardDownloadIcon />}
                    onClick={() => handleDocumentDownload(selectedSolicitud.cand_id, 'Certificado de votación')}
                  >

                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontFamily: 'Century Gothic', fontSize: '16px' }}>
                        Certificado de registro de titulo
                      </Typography>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SimCardDownloadIcon />}
                    onClick={() => handleDocumentDownload(selectedSolicitud.cand_id, 'Certificado de registro de título')}
                  >

                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontFamily: 'Century Gothic', fontSize: '16px' }}>
                        Experiencia laboral
                      </Typography>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SimCardDownloadIcon />}
                    onClick={() => handleDocumentDownload(selectedSolicitud.cand_id, 'Experiencia profesional')}
                  >

                  </Button>
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontFamily: 'Century Gothic', fontSize: '16px' }}>
                        Experiencia de docente
                      </Typography>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SimCardDownloadIcon />}
                    onClick={() => handleDocumentDownload(selectedSolicitud.cand_id, 'Experiencia de docente')}
                  >

                  </Button>
                </ListItem>


                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontFamily: 'Century Gothic', fontSize: '16px' }}>
                        Certificado de no tener impedimento de ejercer cargo público
                      </Typography>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SimCardDownloadIcon />}
                    onClick={() => handleDocumentDownload(selectedSolicitud.cand_id, 'Certificado de no tener impedimento de ejercer cargo público')}
                  >

                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1" style={{ fontFamily: 'Century Gothic', fontSize: '16px' }}>
                        Certificado de no tener responsabilidades administrativas
                      </Typography>
                    }
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SimCardDownloadIcon />}
                    onClick={() => handleDocumentDownload(selectedSolicitud.cand_id, 'Certificado de no tener responsabilidades administrativas')}
                  >

                  </Button>
                </ListItem>


              </List>


              <Button variant="contained" onClick={handleCloseModal}
                style={{ backgroundColor: '#009688', color: 'white', marginTop: '16px', marginLeft: '150px', fontFamily: 'Berlin Sans FB' }}
              >

                Cerrar
              </Button>

            </div>
          )}

        </Box>

      </Modal>
    </div>
  );
}


export { RecursosHumanos };
