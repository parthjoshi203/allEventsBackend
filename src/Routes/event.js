const express = require('express');
const { EventController } = require('../Controller/events.controller');

const router = express.Router();

router.post('/add', EventController.addEvent);
router.get('/get', EventController.getEvents);

module.exports = router;
