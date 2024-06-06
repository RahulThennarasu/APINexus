// signup.js

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Here, you can perform validation and store user information in a database
    // For simplicity, let's assume you're using MongoDB

    // Code to save user data to MongoDB

    res.status(200).json({ message: 'User signed up successfully' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
