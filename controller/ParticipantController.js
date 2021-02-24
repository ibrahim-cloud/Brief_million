let Participant = require("../models/participantModels");


///ajouter Participant
const AddParticipant = (req,res) =>{
    const full_name = req.body.full_name;
    const phone = req.body.phone;
    const age = req.body.age;
    const password = req.body.password;
    const email = req.body.email;

    const newparticipant = new Participant({full_name,phone,age,password,email});
    newparticipant
    .save()
    .then(() => res.json("Participant successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
}


module.exports={AddParticipant}