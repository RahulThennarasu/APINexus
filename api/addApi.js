// pages/api/addApi.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { apiName, shortDescription, docUrl, logoUrl } = req.body;

    if (!apiName || !shortDescription || !docUrl || !logoUrl) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    try {
      const client = await connectToDatabase();
      const db = client.db(dbName);
      const collection = db.collection('apis');
      await collection.insertOne({ apiName, shortDescription, docUrl, logoUrl });
      res.status(201).json({ message: 'API added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add API' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
