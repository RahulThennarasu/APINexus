const mongoose = require('mongoose');

async function connectToMongoDB() {
  const uri = 'your-mongodb-uri';
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    // Perform operations
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();
