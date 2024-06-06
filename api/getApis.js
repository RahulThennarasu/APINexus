// pages/api/getApis.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Fetch all API documents from MongoDB
      const apis = await db.collection('apis').find({}).toArray();

      // Return the API data as JSON
      res.status(200).json(apis);
    } catch (error) {
      console.error('Error fetching APIs:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
