const express = require('express');
const cors = require("cors");
const { Pool } = require('pg');
const app = express();
const port = 5000;
const fs = require('fs');
const pdf = require('pdf-page-counter');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: uploadDir, // Destination folder to save the files
  filename: (req, file, cb) => {
    // Generate a unique filename using Date.now() and the original file's extension
    const uniqueFilename = `${Date.now()}-${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the frontend domain

// Endpoint for file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  
  const dataBuffer = fs.readFileSync(req.file.path);
  
  
  const uniqueFileName = req.file.filename;
  
  pdf(dataBuffer).then(function(data) {
    const numPages = data.numpages;
    console.log("Number of pages:", numPages);
    res.json({ url: req.file.path, numPages }); // Return the URL of the PDF in the response
  }).catch(function(error) {
    console.error("Error reading PDF file:", error);
    res.status(500).json({ error: "Error reading PDF file" });
  });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SistemaPostulacion',
  password: 'password',
  port: 5432,
});


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
