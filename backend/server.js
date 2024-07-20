const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

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


// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, occupation, customOccupation, password, mbti } = req.body;

    //Logic for req.body to cities goes here

    const query = `
      INSERT INTO cities (name, imgpath, info)
      VALUES (?, ?, ?)
    `;
    db.run(query, [name, occupation, customOccupation, password, mbti], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ id: this.lastID });
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



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
  });



module.exports = app;