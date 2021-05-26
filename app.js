const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
require('dotenv').config();

const models = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// the user with the identifier 1 which gets assigned as me property to the request object
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userid', (req, res) => {
  return res.send(req.context.models.users[req.params.userid]);
});

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageid', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageid]);
});

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    // get the authenticated user from the request object and append it as message creator to the message
    userid: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete('/messages/:messageid', (req, res) => {
  const { [req.params.messageid]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
