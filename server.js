require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3019;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("MongoDB connection successful");
});

const userSchema = new mongoose.Schema({
    api_name: String,
    short_description: String,
    doc_url: String,
    logo_url: String
});

const Users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
    console.log(req.body);
    const { api_name, short_description, doc_url, logo_url } = req.body;
    const user = new Users({
        api_name,
        short_description,
        doc_url,
        logo_url
    });
    try {
        await user.save();
        console.log(user);
        res.send({ success: true });
    } catch (error) {
        console.error(error);
        res.send({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;
