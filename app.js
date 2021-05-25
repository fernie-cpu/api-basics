const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(cors());

app.get('/users', (req, res) => {
  return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
});

app.put('/users/:userid', (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userid} resource`);
});

app.delete('/users/:userid', (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userid} resource`);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
