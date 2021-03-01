const mongoose = require('mongoose')
const Qustion =require('./QuestionModel')
const Participant =require('./participantModels')

const qusetionTokenSchema = mongoose.Schema({
    id_question:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Qustion
    },
    participant_anwser :{
        type : String
    },
    id_participant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Participant
    }
})

const QusetionToken = mongoose.model('QusetionToken' , qusetionTokenSchema)

module.exports = QusetionToken