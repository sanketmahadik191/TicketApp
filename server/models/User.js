const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String , enum:['customer','agent','admin'],default:'customer'}
});

module.exports = mongoose.model('User',userSchema);

