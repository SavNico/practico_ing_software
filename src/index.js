const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// POST /save
app.post('/create', async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.send('Nombre requerido');
  }

  try {
    const query = 'INSERT INTO personas (nombre) VALUES (?)';
    await db.query(query, [nombre]);
    res.redirect('/ver');
  } catch (err) {
    console.error('Error al insertar:', err);
    res.send(`Error al guardar en la base de datos: ${err.message}`);
  }
});

app.get('/ver', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM personas');

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'views', 'display.html');

    fs.readFile(filePath, 'utf8', (err, html) => {
      if (err) {
        console.error('Error al leer display.html:', err);
        return res.send('Error al cargar la vista');
      }
      const nombresHTML = results.map(p => `<li>${p.nombre}</li>`).join('');
      const rendered = html.replace('{{nombres}}', nombresHTML);
      res.send(rendered);
    });
  } catch (err) {
    console.error('Error en consulta MySQL:', err);
    res.send('Error al obtener los datos');
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
