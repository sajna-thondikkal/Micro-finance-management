var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function hashPassword(password){
    var hash = bcrypt.hashSync(password,salt);
    return hash;
}

function compareWithHashedPassword(plainPassword,hashedpassword){
    var isMatching = bcrypt.compareSync(plainPassword,hashedpassword);
    return isMatching
}

module.exports = {
    hashPassword,
    compareWithHashedPassword
}