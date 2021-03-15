const express = require('express')
const router = express.Router() 
const AdminController = require('../controller/AdminController')
const Gadmin = require('../middleware/Gadmin')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')


router.post('/login',AdminController.SuperAdminLogin)

router.post('/AddAdmin',[auth,Gadmin],AdminController.AddAdmin)

router.get('/user',AdminController.getuser)

router.put("/valid/:id" ,[auth,Gadmin],AdminController.SuperAdminValid) ;

router.post('/addquestion',[auth,admin],AdminController.createQuestion)



module.exports = router