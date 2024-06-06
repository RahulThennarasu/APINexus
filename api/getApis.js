// api/getApis.js
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

export default async (req, res) => {
  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection('apis');
    const apis = await collection.find({}).toArray();
    res.status(200).json(apis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APIs' });
  }
};
