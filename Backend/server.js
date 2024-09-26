const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ToDo = require('./models/ToDo');
const authMiddleware = require('./middleware/authMiddleware');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(authMiddleware);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await ToDo.find({ userId: req.user.uid });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new ToDo({
      text,
      userId: req.user.uid,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/todos/:id',authMiddleware, async (req, res) => {
  try {
    console.log( req.user)
    await ToDo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'ToDo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
