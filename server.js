const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000; // or another port of your choice

// Replace this with your MongoDB URI
const mongoURI = 'mongodb+srv://rahulthennarasu07:Lego@apinexus.lzowu0k.mongodb.net/?retryWrites=true&w=majority&appName=apinexus';
let db;

app.use(bodyParser.json());
app.use(express.static('public')); // for serving static files like your HTML and CSS

// Connect to MongoDB using URI
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    return;
  }
  db = client.db('apiDatabase');
  console.log('Connected to MongoDB');
});

// Save API Data
app.post('/api/save', (req, res) => {
  const apiData = req.body;
  db.collection('apis').insertOne(apiData, (err, result) => {
    if (err) {
      res.status(500).json({ success: false });
      return;
    }
    res.json({ success: true });
  });
});

// Get API Data
app.get('/api/get', (req, res) => {
  db.collection('apis').find({}).toArray((err, apis) => {
    if (err) {
      res.status(500).json({ success: false });
      return;
    }
    res.json({ apis });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
