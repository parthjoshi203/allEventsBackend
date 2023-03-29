const express = require('express');
const { EventController } = require('../Controller/events.controller');

const router = express.Router();

router.post('/add', EventController.addEvent);

module.exports = router;
