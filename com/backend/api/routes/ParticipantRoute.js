const express = require('express')
const router = express.Router() 
const ParticipantController = require('../controller/ParticipantController')
const Gadmin = require('../middleware/Gadmin')
const auth = require('../middleware/auth')

router.route("/signup").post(ParticipantController.AddParticipant) ;

router.route("/login").post(ParticipantController.ParticipantLogin) ;

router.post("/create",[auth],ParticipantController.AddGroupe);

router.post("/join",[auth],ParticipantController.joinGroupe);

router.post("/reponse/:id",[auth],ParticipantController.reponse);

router.get('/find/:Idwiner',ParticipantController.FindWinner)

router.get('/getQuestion/:code',ParticipantController.getRandomQuestion)

// router.get('/getNumber/:code',ParticipantController.getNumberInGroup)

router.get('/getwinner/:code',ParticipantController.Winner)

router.get('/AllParticipant',ParticipantController.allParticipant)


module.exports = router
