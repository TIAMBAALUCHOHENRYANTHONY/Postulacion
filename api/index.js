const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require('pg');
const app = express();
const port = 5000;
const fs = require('fs');
const pdf = require('pdf-page-counter');
const PDF = require('./docs');
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
app.use(express.json());

// Endpoint for file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { username, tipoDocumento } = req.body;
  const dataBuffer = fs.readFileSync(req.file.path);

  const doc = new PDF({
    username,
    tipoDocumento,
    pdfPath: req.file.path,
    pdfFile: dataBuffer
  });

  doc.save();

  
  
  
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
  password: 'root',
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

//Login

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM candidato";
  db.query(sqlSelect, (err, rows, results) => {
    res.send(rows);
  });
});

app.post("/api/login", async (req, res) => {
  const cand_num_identificacion = req.body.cand_num_identificacion;
  const cand_password = req.body.cand_password; // Corregir 'req.cand_password' a 'req.body.cand_password'

  pool.query(
    "SELECT * FROM candidato WHERE cand_num_identificacion = $1 AND cand_password = $2", // Agregar '$1' y '$2' como marcadores de posición
    [cand_num_identificacion, cand_password],
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        res.status(500).send("Error executing query");
      } else {
        if (result.rows.length > 0) {
          // Verificar si result.rows está definido y tiene elementos
          res.send(result.rows);
        } else {
          res.send({ message: "Usuario o contraseña incorrecta!" });
        }
      }
    }
  );
});

// Función para obtener un candidato por su número de identificación desde la base de datos
async function getCandidateByIdentification(cand_num_identificacion) {
  const query = 'SELECT * FROM candidato WHERE cand_num_identificacion = $1';
  const values = [cand_num_identificacion];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
