const express = require('express')
const router = express.Router() 
const ParticipantController = require('../controller/ParticipantController')
const Gadmin = require('../middleware/Gadmin')
const auth = require('../middleware/auth')

router.route("/signup").post(ParticipantController.AddParticipant) ;

router.route("/login").get(ParticipantController.ParticipantLogin) ;

router.post("/create",[auth],ParticipantController.AddGroupe);

router.post("/join",[auth],ParticipantController.joinGroupe);

router.post("/reponse/:id",[auth]

,ParticipantController.reponse);


module.exports = router
