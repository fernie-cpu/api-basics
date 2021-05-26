const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageid', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageid]);
});

router.post('/', (req, res) => {
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

router.delete('/:messageid', (req, res) => {
  const { [req.params.messageid]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

module.exports = router;
