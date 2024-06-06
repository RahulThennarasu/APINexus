const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let client;

if (!client) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (!client.isConnected()) await client.connect();
      const db = client.db('apinexus');
      const collection = db.collection('apis');

      const { apiName, shortDescription, docUrl, logoUrl } = req.body;
      const newApi = { apiName, shortDescription, docUrl, logoUrl };

      const result = await collection.insertOne(newApi);

      res.status(200).json({ message: 'API added successfully', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
