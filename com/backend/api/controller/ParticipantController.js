const mongoose = require('mongoose')
let Participant = require("../models/participantModels");
let Groupe = require("../models/GroupModel");
let Question = require("../models/QuestionModel");
let QuestionToken = require("../models/QuestionToken");
let Round = require("../models/RoundModel");



const jwt = require('jsonwebtoken');

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
///// Login Participant
const ParticipantLogin = async (req,res)=>{
    const{phone,password} = req.body
   const participant= await Participant.findOne({phone, password}, (err, participant) => {
       
        if(err || !participant || !participant.is_valid  ) {
            return res.status(400).json({
                error : "Admin not found with this email, Please Singup"
            })
            }
   else   {
    token = jwt.sign({ _id: participant._id   }, 'secretkey')
    res.send({ participant: participant, token: token })  
          }
          });
          } 
///// Create Group 
const AddGroupe = async (req,res) =>{
    const token = req.header('votre-token')
    const codeToken = jwt.verify(token, 'secretkey')
    console.log(codeToken._id)
    await Participant.findByIdAndUpdate({_id : codeToken._id},{$set:{points : 0}})
    const GroupMembrs = new Groupe({
        id_participants: codeToken._id,
        code: req.body.code
    })
    GroupMembrs
    .save()
    .then(() => res.json("GroupMembrs successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
}

////Join Group
const joinGroupe = async(req,res) =>{
    const token = req.header('votre-token')
    const codeToken = jwt.verify(token, 'secretkey')
    let code = req.body.code;
    console.log(codeToken._id)
    await Participant.findByIdAndUpdate({_id : codeToken._id},{$set:{points : 0}})
 const gr =  await Groupe.findOne({code:code})
  
    .then(group => {
            if(!group) {
                return res.status(404).send({
                    message: "group not found"
                });            
            }
            if(group.id_participants.length > 3) {
                    return res.send({
                        message: "group has 4 player all"
                       
                    });             
            }
            
            Groupe.updateOne(
                
                    { code: code },
                    { $push: { id_participants: [codeToken._id] } },
                    function(err, result) {
                      if (err) {
                        res.send(err);
                      } else {
                        res.send(result);
                      }
                    }
                  )
    
        }).catch(err => {
            return res.status(500).send({
                message: "Error retrieving group with id " + err
            });
        });
     }

//////answer Player
const reponse = async(req,res) =>{
    const token = req.header('votre-token')
    const codeToken = jwt.verify(token, 'secretkey')
    ///require code groupe and Id question
        const group = req.body.group
        const Idquestion = req.params.id
        ///find Group
        const groupM = await Groupe.findOne({ code: group })
            //  console.log(groupM.start)
            ///check group Is Ready for new Game 
        if (groupM.start === true) {


            const findquestion = await Question.findById({ _id: req.params.id })
             ///// Check question Have a answer Or not
            const allQustions = await Groupe.aggregate([
                { $match: { "code": group } },
                {
                    $project: {
                        "questions": "$questions",
                        "hasQuestion": {
                            $in: [Idquestion, "$questions"]
                        }
                    }
                }
            ])
            console.log(allQustions)
            if (allQustions[0].hasQuestion) {
                res.send('you can\'t')
            } else {
                 /// push Question To Group question Array
                 await groupM.questions.push(Idquestion)
                 await groupM.save()
                 ////create New Question Token 
                const questionToken = new QuestionToken({

                    id_question: Idquestion,
                    participant_anwser: req.body.anwser,
                    id_participant: codeToken._id

                })
                const savequestionToken = await questionToken.save()
                ////create New Round
                const round = new Round({
                    id_group: groupM._id,
                    id_question: Idquestion,
                    id_question_token: savequestionToken._id
                })
                  await round.save()
                // console.log(findquestion);
                console.log(findquestion.answer)
                ////chek Answer Is Correct or Not 
                if (findquestion.answer == req.body.anwser) {
                    console.log('question correct');
                 await Participant.updateOne({ _id: codeToken._id }, { $inc: { points: findquestion.points } })
                } else {
                    console.log('question incorrect');
                }
                ///Check Nember Question In Group
                if (groupM.questions.length === 2) {
                    await groupM.updateOne({ start: false })
                    // find participant in group 
                    console.log(groupM.id_participants)
                    const pointParticipant1 = await Participant.findById({ _id: groupM.id_participants[0] }).select('points')
                    const pointParticipant2 = await Participant.findById({ _id: groupM.id_participants[1] }).select('points')
                    // const pointParticipant3 = await Participant.findById({ _id: groupM.id_participants[2] }).select('points')
                    // const pointParticipant4 = await Participant.findById({ _id: groupM.id_participants[3] }).select('points')
                    console.log('part0'+pointParticipant1)

                    // Push Score For each Participant
                    const Score = [];
                    Score.push(pointParticipant1.points)
                    Score.push(pointParticipant2.points)
                    // points.push(pointParticipant3.points)
                    // points.push(pointParticipant4.points)
                    
                  //// Calculer the max Score 
                    const ScoreMaxiPlayer = Score.indexOf(Math.max.apply(Math, Score))
                    console.log("ScoreMaxi is  " + ScoreMaxiPlayer)
                    const Participantwinner = await Participant.findById({ _id: groupM.id_participants[ScoreMaxiPlayer] })
                    console.log(  'Participantwinner is  /n' + Participantwinner );

                }
                res.status(200).send('question suivant')
            }
        } else {
            res.status(404).send('jeu terminé')
            
        }   
}



module.exports={AddParticipant ,ParticipantLogin ,AddGroupe ,joinGroupe,reponse}