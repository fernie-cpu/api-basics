const express = require('express');
const app = express();

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Look at us... again');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
