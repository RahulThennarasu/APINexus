// pages/api/getApis.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch all API documents from MongoDB
    const apis = await db.collection('apis').find({}).toArray();

    // Return the API data as JSON
    res.status(200).json(apis);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
