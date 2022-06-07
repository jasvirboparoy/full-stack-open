const express = require('express');
const router = express.Router();
const redis = require('../redis')

router.get('/', async (req, res) => {
  const addedTodos = await redis.getAsync("added_todos");
  if (addedTodos === null) {
    res.send({ "added_todos" : 0 });
  } else {
    res.send({ "added_todos" : addedTodos });
  }
})

module.exports = router;