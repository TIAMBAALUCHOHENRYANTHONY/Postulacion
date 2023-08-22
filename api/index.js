const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = 5000;
const fs = require("fs");
const pdf = require("pdf-page-counter");
const PDF = require("./docs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");
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
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { username, tipoDocumento } = req.body;
  const dataBuffer = fs.readFileSync(req.file.path);

  const doc = new PDF({
    username,
    tipoDocumento,
    pdfPath: req.file.path
  });

  doc.save();

  const uniqueFileName = req.file.filename;

  pdf(dataBuffer)
    .then(function (data) {
      const numPages = data.numpages;
      console.log("Number of pages:", numPages);
      res.json({ url: req.file.path, numPages }); // Return the URL of the PDF in the response
    })
    .catch(function (error) {
      console.error("Error reading PDF file:", error);
      res.status(500).json({ error: "Error reading PDF file" });
    });
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configuración de PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SistemaPostulacion",
  password: "root",
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    client.release(); // Release the client back to the pool
  })
  .catch(error => {
    console.error('Error connecting to PostgreSQL:', error);
  });

// Endpoint to fetch data from the "my_table"
app.get("/postulacion", (req, res) => {
  pool.query("SELECT * FROM postulacion", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error fetching datas");
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get("/sede", (req, res) => {
  pool.query("SELECT * FROM sede", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error fetching datas");
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get("/departamento", (req, res) => {
  pool.query("SELECT * FROM departamento", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error fetching datas");
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get("/campo_amplio", (req, res) => {
  pool.query("SELECT * FROM campo_amplio", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error fetching datas");
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get("/campo_especifico", (req, res) => {
  pool.query("SELECT * FROM campo_especifico", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error fetching datas");
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get("/contratacion", (req, res) => {
  pool.query("SELECT * FROM contratacion", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error fetching datas");
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get("/personal_academico", (req, res) => {
  pool.query("SELECT * FROM personal_academico", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error fetching datas");
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
});

app.get("/tabla", (req, res) => {
  const {
    postulacion,
    sede,
    departamento,
    campo_amplio,
    campo_especifico,
    contratacion,
    personal_academico,
  } = req.query;

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

  const values = [
    postulacion,
    sede,
    departamento,
    campo_amplio,
    campo_especifico,
    contratacion,
    personal_academico,
  ];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error fetching data");
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

app.post("/api/login_candidatos", async (req, res) => {
  const cand_num_identificacion = req.body.cand_num_identificacion;
  const cand_password = req.body.cand_password;

  pool.query(
    "SELECT * FROM candidato WHERE cand_num_identificacion = $1 AND cand_password = $2",
    [cand_num_identificacion, cand_password],
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        res.status(500).send("Error executing query");
      } else {
        if (result.rows.length > 0) {
          res.send(result.rows[0]);
        } else {
          res.send({ message: "Usuario o contraseña incorrecta!" });
        }
      }
    }
  );
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM rechum";
  db.query(sqlSelect, (err, rows, results) => {
    res.send(rows);
  });
});

app.post("/api/login_recursos_humanos", async (req, res) => {
  const rh_correo = req.body.rh_correo;
  const rh_password = req.body.rh_password;

  pool.query(
    "SELECT * FROM rechum WHERE rh_correo = $1 AND rh_password = $2",
    [rh_correo, rh_password],
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        res.status(500).send("Error executing query");
      } else {
        if (result.rows.length > 0) {
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
  const query = "SELECT * FROM candidato WHERE cand_num_identificacion = $1";
  const values = [cand_num_identificacion];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching candidate:", error);
    throw error;
  }
}

//Register
app.get("/candidatos", async (req, res) => {
  try {
    // Realiza la consulta para obtener todos los candidatos de la base de datos
    const query = "SELECT * FROM public.candidato;";
    const result = await pool.query(query);
    const candidatos = result.rows;

    return res.status(200).json(candidatos);
  } catch (error) {
    console.error("Error al obtener candidatos:", error);
    return res.status(500).json({ message: "Error al obtener candidatos" });
  }
});

app.post("/api/candidatos", (req, res) => {
  const cand_tipo_identificacion = req.body.cand_tipo_identificacion;
  const cand_num_identificacion = req.body.cand_num_identificacion;
  const cand_sexo = req.body.cand_sexo;
  const cand_titulo = req.body.cand_titulo;
  const cand_fecha_nacimiento = req.body.cand_fecha_nacimiento;
  const cand_correo = req.body.cand_correo;
  const cand_password = req.body.cand_password;
  const cand_nombre1 = req.body.cand_nombre1;
  const cand_nombre2 = req.body.cand_nombre2;
  const cand_apellido1 = req.body.cand_apellido1;
  const cand_apellido2 = req.body.cand_apellido2;

  pool.query(
    "INSERT INTO candidato (cand_tipo_identificacion,cand_num_identificacion,cand_sexo,cand_titulo,cand_fecha_nacimiento,cand_correo,cand_password,cand_nombre1,cand_nombre2,cand_apellido1,cand_apellido2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
    [
      cand_tipo_identificacion,
      cand_num_identificacion,
      cand_sexo,
      cand_titulo,
      cand_fecha_nacimiento,
      cand_correo,
      cand_password,
      cand_nombre1,
      cand_nombre2,
      cand_apellido1,
      cand_apellido2,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

// Ruta para el método POST para insertar datos en la tabla candidato
app.post("/candidatos", async (req, res) => {
  try {
    const {
      cand_tipo_identificacion,
      cand_num_identificacion,
      cand_sexo,
      cand_titulo,
      cand_fecha_nacimiento,
      cand_correo,
      cand_password,
      cand_nombre1,
      cand_nombre2,
      cand_apellido1,
      cand_apellido2,
    } = req.body;

    // Realiza la inserción en la base de datos
    const query = `
      INSERT INTO public.candidato (
        cand_tipo_identificacion,
        cand_num_identificacion,
        cand_sexo,
        cand_titulo,
        cand_fecha_nacimiento,
        cand_correo,
        cand_password,
        cand_nombre1,
        cand_nombre2,
        cand_apellido1,
        cand_apellido2
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING cand_id;
    `;
    const values = [
      cand_tipo_identificacion,
      cand_num_identificacion,
      cand_sexo,
      cand_titulo,
      cand_fecha_nacimiento,
      cand_correo,
      cand_password,
      cand_nombre1,
      cand_nombre2,
      cand_apellido1,
      cand_apellido2,
    ];

    const result = await pool.query(query, values);
    const insertedId = result.rows[0].cand_id;

    return res
      .status(201)
      .json({ message: "Candidato creado con éxito", insertedId });
  } catch (error) {
    console.error("Error al insertar candidato:", error);
    return res.status(500).json({ message: "Error al insertar candidato" });
  }
});

app.post('/solicitud', async (req, res) => {
  const { cand_id, ofe_id } = req.body;

  try {
    // Configurar el valor inicial del campo "sol_aprobado" en false
    const sol_aprobado = false;

    // Guardar la postulación en la tabla "solicitud" usando la conexión a PostgreSQL
    const query = 'INSERT INTO solicitud (cand_id, ofe_id, sol_aprobacion) VALUES ($1, $2, $3) ';
    const values = [cand_id, ofe_id, sol_aprobado];
    const result = await pool.query(query, values);

    // Responder con éxito y enviar la nueva solicitud creada
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // En caso de error, responder con un código de error y un mensaje de error
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
});

//Recursos humanos



app.get('/solicitudes', async (req, res) => {
  try {
    const query = `
      SELECT s.sol_id, s.sol_aprobacion, s.ofe_id,
             c.cand_tipo_identificacion, c.cand_num_identificacion, c.cand_sexo,
             c.cand_titulo, c.cand_fecha_nacimiento, c.cand_id,
             c.cand_correo, c.cand_nombre1, c.cand_nombre2,
             c.cand_apellido1, c.cand_apellido2
      FROM public.solicitud s
      JOIN public.candidato c ON s.cand_id = c.cand_id;
    `;

    const client = await pool.connect();
    const result = await client.query(query);
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
