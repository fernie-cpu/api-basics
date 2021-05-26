require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'welcome to the api',
  });
});

// PROTECTED ROUTE
app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'post created',
        authData,
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  //mock user
  const user = {
    id: 1,
    username: 'fernie',
    email: 'fernie@gmail.com',
  };

  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({
      token,
    });
  });
});

// FORMAT TOKEN
// Authorization: Bearer <access_token>

//verify token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    // get token from arrar
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
