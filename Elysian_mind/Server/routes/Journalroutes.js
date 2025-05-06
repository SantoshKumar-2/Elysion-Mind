const express = require('express');
const router = express.Router();
const Journalcontroller = require('../Controller/Journalcontroller');

router.post('/journal', Journalcontroller.GratitudeJournal);

module.exports = router;
