const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    quest: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim : true
    },
    false_choices: {
        type: Array,
        required: true,
        trim : true
    },
    points: {
        type: Number,
        required: true,
        trim: true
    }
})


const Question = mongoose.model('Question', questionSchema)
module.exports = Question;