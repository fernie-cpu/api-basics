const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Look at us... again');
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
