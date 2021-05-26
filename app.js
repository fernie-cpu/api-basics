const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();

const models = require('./models');
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// the user with the identifier 1 which gets assigned as me property to the request object
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
