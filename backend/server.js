const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 8080;

const PEXELS_API_KEY = 'YHhc0Jmp8HBPWCjSypxPoSE3t4aDesVmxV250GrmPdnikEX8Rf0nklQI';

const db = new sqlite3.Database('cities.db', (err) => {
    if (err) {
      console.error('Could not open database', err.message);
    } else {
      db.run(`
        CREATE TABLE IF NOT EXISTS cities (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          imgpath TEXT,
          info TEXT
        )
      `);
    }
});


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
  }));

app.get('/', async(req,res) => {
    res.status(200).json({ message: "Hello world" })
})


// Endpoint to handle form submission (FIXXXXXX)
app.post('/submit', (req, res) => {
    const { name, occupation, customOccupation, password, mbti } = req.body;

    //Logic for req.body to cities goes here

    const query = `
      INSERT INTO cities (name, imgpath, info)
      VALUES (?, ?, ?)
    `;
    db.run(query, [name, imgpath, customOccupation, password, mbti], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id: this.lastID });
    });
  });

// Endpoint to add a city to cities DB
app.post('/addCity', (req, res) => {
    const { name, imgpath, info } = req.body;

    const query = `
      INSERT INTO cities (name, imgpath, info)
      VALUES (?, ?, ?)
    `;
    db.run(query, [name, imgpath, info], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id: this.lastID });
    });
});


// Endpoint to get a city by ID
app.get('/getCity/:id', (req, res) => {
    const { id } = req.params;
    
    const query = `SELECT * FROM cities WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    });
});


// Endpoint to get events by city
app.get('/events', (req, res) => {
    const { city } = req.query;
  
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
  
    const query = 'SELECT * FROM cities WHERE city = ?';
    
    db.all(query, [city], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(rows);
    });
});

// Endpoint to get images for a certain city
app.get('/city-images', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: { query: city, per_page: 10 },
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });

    const images = response.data.photos.map(photo => ({
      id: photo.id,
      url: photo.src.original,
      description: photo.alt
    }));

    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving images' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
  });



module.exports = app;