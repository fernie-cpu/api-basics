require('dotenv').config();
const express = require('express');

const app = express();
require('./passport');

const auth = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', auth);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
