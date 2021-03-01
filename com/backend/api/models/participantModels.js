const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({

    full_name: {
        type: String, 
        required : true  
    },
    age: {
        type: Number, 
        required : true  
    },
    phone: {
        type: String, 
        required : true  
    },
    is_valid: {
        type: Boolean, 
        required : true ,
        default:false
    },
   online: {
        type: Boolean, 
        required : true  ,
        default:false
    },
    password: {
        type: String, 
        required : true  
    },
    email: {
        type: String, 
        required : true  
    },
    points : Number
});

const Participant = mongoose.model(" Participant", ParticipantSchema);
module.exports = Participant;