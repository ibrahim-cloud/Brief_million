const express = require('express')
const router = express.Router() 
const ParticipantController = require('../controller/ParticipantController')
const Gadmin = require('../middleware/Gadmin')
const auth = require('../middleware/auth')

router.route("/signup").post(ParticipantController.AddParticipant) ;


module.exports = router
