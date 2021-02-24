const express = require('express')
const router = express.Router() 
const AdminController = require('../controller/AdminController')
const Gadmin = require('../middleware/Gadmin')
const auth = require('../middleware/auth')


router.post('/login',AdminController.SuperAdminLogin)

router.post('/AddAdmin',[auth,Gadmin],AdminController.AddAdmin)

router.put("/valid/:id" ,[auth,Gadmin],AdminController.SuperAdminValid) ;


module.exports = router