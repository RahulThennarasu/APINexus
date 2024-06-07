const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/students', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log("MongoDB connection successful");
});

const userSchema = new mongoose.Schema({
  api_name: String,
  short_description: String,
  doc_url: String,
  logo_url: String,
});

const Users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
  const { api_name, short_description, doc_url, logo_url } = req.body;

  if (!api_name || !short_description || !doc_url || !logo_url) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = new Users({
      api_name,
      short_description,
      doc_url,
      logo_url,
    });

    await user.save();
    console.log(user);
    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/get', async (req, res) => {
  try {
    const apis = await Users.find({});
    res.json({ apis });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("Server Started on port", port);
});
