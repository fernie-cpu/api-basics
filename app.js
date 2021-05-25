const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// the user with the identifier 1 which gets assigned as me property to the request object
app.use((req, res, next) => {
  req.me = users[1];
  next();
});

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userid: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userid: '2',
  },
};

app.get('/users', (req, res) => {
  return res.send(Object.values(users));
});

app.get('/users/:userid', (req, res) => {
  return res.send(users[req.params.userid]);
});

app.get('/messages', (req, res) => {
  return res.send(Object.values(messages));
});

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    // get the authenticated user from the request object and append it as message creator to the message
    userid: req.me.id,
  };

  messages[id] = message;

  return res.send(message);
});

app.get('/messages/:messageid', (req, res) => {
  return res.send(messages[req.params.messageid]);
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
