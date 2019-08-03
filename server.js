const express = require('express');

const connectDB = require('./config/connectDB');

const app = express();
connectDB();

app.get('/', (req, res) => {
  res.json({
    msg: "Welcome to contacts-book API"
  });
});

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}...`);
});