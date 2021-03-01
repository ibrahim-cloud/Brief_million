let Admin = require("../models/AdminModels");
let participant = require("../models/participantModels");
let Question = require("../models/QuestionModel");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

///Add first Admin
const AddAdmin = (req,res) =>{
      
      
     const full_name = req.body.full_name;
      const phone = req.body.phone;
      const password = req.body.password;
      const email = req.body.email;
  
      const newAdmin = new Admin({full_name,phone,password,email});
      newAdmin
      .save()
      .then(() => res.json("Admin successfully added"))
      .catch((err) => res.status(400).json("Error :" + err));
}
/////Login Admin
const SuperAdminLogin = async (req,res)=>{
    const{phone,password} = req.body
  const admin =  await Admin.findOne({phone, password})
        if (admin) {
            var token = null
            if (admin.is_super_admin) {
                token = jwt.sign({ _id: admin._id   , is_super_admin: admin.is_super_admin }, 'secretkey')
                console.log('super admin');
                console.log(admin.is_super_admin)
            }
            else {
                token = jwt.sign({ _id: admin._id    , is_admin: admin.is_admin }, 'secretkey' )
                console.log('admin');
            }
            res.send({ admin: admin, token: token })
        
    }
 else {
    res.send('go to signup page')
}
         
          }
//// Validition Participant
 const SuperAdminValid = (req,res) =>{
       
    participant.findById(req.params.id)

   


      .then((Participant) => {  
        Participant.is_valid = req.body.is_valid;
        Participant
            .save()
            .then(() => res.json("is_valid successfully updated"))
            
            
  
   
    var transporter =   nodemailer.createTransport({
      service: 'gmail',
    port: 535,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'himi66447@gmail.com', // generated ethereal user
        pass: ''  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
    });
    
    var mailOptions =  {
      from: 'himi66447@gmail.com',
      to: Participant.email,
      subject: 'Qui va gagner le million',
      text: 'Votre compte a été activé avec succès'
    };
    
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
}  
//////Add Question
const createQuestion = (req, res) => {

    const question = new Question(req.body)

    question.save((err, question) => {
      if(err){
          return res.status(400).json({
              error: "bad Request !"
          })
      }

      res.json(
          question
      )
    })
}

  module.exports={AddAdmin ,SuperAdminLogin , SuperAdminValid ,createQuestion }