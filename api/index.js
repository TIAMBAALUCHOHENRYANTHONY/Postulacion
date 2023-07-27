const express = require('express');
const cors = require("cors");
const { Pool } = require('pg');
const app = express();
const port = 5000;

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PostulacionBD',
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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
