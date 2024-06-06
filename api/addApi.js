// pages/api/addApi.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { apiName, shortDescription, docUrl, logoUrl } = req.body;

    try {
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
    } catch (error) {
      console.error('Error adding API:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
