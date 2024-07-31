const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

sequelize.sync({ force: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error: ' + err));

app.listen(port, () => console.log(`Server started on port ${port}`));
