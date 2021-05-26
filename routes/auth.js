const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

// POST Login
router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }

    // set session option to false won't save the user in the session
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'jwtSecret');
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
