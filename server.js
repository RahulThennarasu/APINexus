// index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3019;

// Middleware
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connection successful');
});

// Define Schema and Model
const userSchema = new mongoose.Schema({
    api_name: String,
    short_description: String,
    doc_url: String,
    logo_url: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
    const { api_name, short_description, doc_url, logo_url } = req.body;
    const newUser = new User({
        api_name,
        short_description,
        doc_url,
        logo_url
    });

    try {
        await newUser.save();
        console.log('User saved:', newUser);
        res.send('Form submitted successfully');
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Error submitting form');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
