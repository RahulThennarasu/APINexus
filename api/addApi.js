const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let client;

if (!client) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      if (!client.isConnected()) await client.connect();
      const db = client.db('apinexus');
      const collection = db.collection('apis');

      const apis = await collection.find({}).toArray();

      res.status(200).json(apis);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
