const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/post');


app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

sequelize.sync({ force: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error: ' + err));


// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);

module.exports = app;