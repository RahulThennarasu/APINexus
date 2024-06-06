// pages/api/addApi.js

import { connectToDatabase } from '../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { apiName, shortDescription, docUrl, logoUrl } = req.body;

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Insert the new API data into MongoDB
    const result = await db.collection('apis').insertOne({
      apiName,
      shortDescription,
      docUrl,
      logoUrl,
    });

    // Return the inserted document
    res.status(201).json(result.ops[0]);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
