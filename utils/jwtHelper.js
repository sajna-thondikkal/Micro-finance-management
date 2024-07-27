const jwt = require('jsonwebtoken');
var SECRET = "keibotsajna"

function createjwt(userId){
    var token = jwt.sign({userId:userId},SECRET);
    return token;
}

function verifyToken(token){
    return new Promise((resolve,reject)=>{
        const formattedToken = token.replace('Bearer ','');
        jwt.verify(formattedToken,SECRET,(err,decoded)=>{
        if(err) return reject({valid:false,error:err}) ;
        return resolve({valid:true,userid:decoded.userId});
        })
    })
    
}

module.exports = {
    createjwt,
    verifyToken
}