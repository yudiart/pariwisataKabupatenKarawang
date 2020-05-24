function Role(roles){
    return (req,res,next) =>{
        if (req.user.role !== roles){
            res.status(403);
            return res.send('not allowed')
        }
        next();
    }
}

module.exports = {
    Role
}