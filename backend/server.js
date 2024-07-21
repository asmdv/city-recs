const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const config = require('./config.json');
const extra = require('./extra.json');

const app = express();

const PORT = process.env.PORT || 3000;

const PEXELS_API_KEY = config.pexelsApiKey;

const db = new sqlite3.Database('cities.db', (err) => {
    if (err) {
      console.error('Could not open database', err.message);
    } else {
      db.run(`
        CREATE TABLE IF NOT EXISTS cities (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          info TEXT
        )
      `);
    }
});

const url = `${config.model_url}/v1/chat/completions`;
const apiKey = config.apiKey;
var isTestEnv = config.isTest;

function prepareQuizPostBody(occupation, music) {
  var data = {
      messages: [
          {
              role: 'user',
              content: `I work as a ${occupation}. I love ${music} music. Recommend 3 cities in the United States to move in. Don't add comments. Answer this way: City, State; City, State; City, State`
          }
      ],
      max_tokens: 512,
      temperature: 0.7,
      top_p: 1
  };
  return data
}

function prepareExplainationPostBody(occupation, music, city) {
  var data = {
      messages: [
          {
              role: 'user',
              content: `I work as a ${occupation}. I love ${music} music. Why would I like ${city}? Explain in one paragraph.`
          }
      ],
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 1
  };
  return data
}

// Middleware
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

app.post('/ask', async (req, res) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  
    try {
        var {occupation,  music, isTest} = req.body;
        if (isTest && isTest === true) {
          isTestEnv = true;
        }
        if (!occupation || !music) {
            throw error("Invalid request. Body")
        }
        var bodyData = prepareQuizPostBody(occupation=occupation, music=music);
        var result;
        var response;
        if (isTestEnv)
          result = extra.testCities;
        else {
          response = await axios.post(url, bodyData, { headers });
          result = response.data.choices[0].message.content;
        }
        // Use regex to extract city and state names
        const regex = /\b([A-Za-z\s]+),\s*([A-Za-z\s]+)\b/g;
        const matches = result.match(regex) || []; // Use match() with the regex, default to empty array if null
        
        var explanation;
        if (isTestEnv){
            explanation = extra.testExplanation;
        } else {
          var bodyData = prepareExplainationPostBody(occupation=occupation, music=music, city=matches[0]);
          response = await axios.post(url, bodyData, { headers });
          explanation = response.data.choices[0].message.content;
        }

        var finalResponse = {"cities": matches, "explanation": explanation, "isTest": isTestEnv};
        res.send(finalResponse);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred on the server.");
    }
});

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


  if (process.env.NODE_ENV === 'production') {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }



module.exports = app;