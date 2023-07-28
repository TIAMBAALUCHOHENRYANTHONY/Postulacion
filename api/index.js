const express = require('express');
const cors = require("cors");
const { Pool } = require('pg');
const app = express();
const port = 5000;

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SistemaPostulacion',
  password: 'admin',
  port: 5432,
});

app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the frontend domain

// Endpoint to fetch data from the "my_table"
app.get('/postulacion', (req, res) => {
  pool.query('SELECT * FROM postulacion', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error fetching datas');
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get('/sede', (req, res) => {
  pool.query('SELECT * FROM sede', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error fetching datas');
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});


app.get('/departamento', (req, res) => {
  pool.query('SELECT * FROM departamento', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error fetching datas');
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get('/campo_amplio', (req, res) => {
  pool.query('SELECT * FROM campo_amplio', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error fetching datas');
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get('/campo_especifico', (req, res) => {
  pool.query('SELECT * FROM campo_especifico', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error fetching datas');
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get('/contratacion', (req, res) => {
  pool.query('SELECT * FROM contratacion', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error fetching datas');
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get('/personal_academico', (req, res) => {
  pool.query('SELECT * FROM personal_academico', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error fetching datas');
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get('/tabla', (req, res) => {
  const { postulacion, sede, departamento, campo_amplio, campo_especifico, contratacion, personal_academico } = req.query;

  // Construir la consulta SQL con las restricciones
  const query = `
    SELECT * FROM oferta
    WHERE
      post_id = (SELECT post_id FROM postulacion WHERE post_periodo=$1)
      AND sede_id = (SELECT sede_id FROM sede WHERE sede_nombre=$2)
      AND dept_id = (SELECT dept_id FROM departamento WHERE dept_nombre=$3)
      AND ca_id = (SELECT ca_id FROM campo_amplio WHERE ca_nombre=$4)
      AND ce_id = (SELECT ce_id FROM campo_especifico WHERE ce_nombre=$5)
      AND con_id = (SELECT con_id FROM contratacion WHERE con_nombre=$6)
      AND pa_id = (SELECT pa_id FROM personal_academico WHERE pa_nombre=$7)
  `;

  

  
  const values = [postulacion, sede, departamento, campo_amplio, campo_especifico, contratacion, personal_academico];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
