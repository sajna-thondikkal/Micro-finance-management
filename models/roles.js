const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_name:{
        required: true,
        type:String
    }
})

const Role = mongoose.model('Role',roleSchema);
module.exports = Role;