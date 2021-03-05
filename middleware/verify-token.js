import jwt from "jsonwebtoken"

module.exports = function auth (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Erişme yetkiniz yok.')

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (e) {
        res.status(400).send('Token geçersiz.')
    }
}
