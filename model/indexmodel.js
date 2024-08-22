var mongoose=require('mongoose');

const token=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
})
module.exports=mongoose.model('login',token)