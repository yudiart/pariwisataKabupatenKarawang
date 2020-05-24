function noAuth(req,res,next){
    if (req.user === null){
        res.status(403);
        return res.send('tidak ada user')
    }
    next();

}

module.exports = {
    noAuth
}