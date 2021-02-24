module.exports = function (req,res,next){
    if(!req.admin.is_super_admin){
        return res.status(403).send('plz cette page pour superadmin')
    }
    next();
}