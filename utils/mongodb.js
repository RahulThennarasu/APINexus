// utils/mongodb.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let db;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    db = client.db(process.env.MONGODB_DB);
  }
  return { db, client };
}
