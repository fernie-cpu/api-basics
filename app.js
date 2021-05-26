require('dotenv').config();
const express = require('express');

const app = express();

const passport = require('./passport');
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);
app.use('/user', passport.authenticate('jwt', { session: false }), routes.user);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
