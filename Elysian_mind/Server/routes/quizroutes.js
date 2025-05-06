const express = require('express');
const router = express.Router();
const quizcontroller = require('../Controller/quizcontroller');

router.post('/quiz', quizcontroller.assessment);

module.exports = router;