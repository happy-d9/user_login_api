const mongoose=require('mongoose');

const user=new mongoose.Schema(
    {
        name:{type:String},
        email:{type:String},
        contact_number:{type:Number},
        gender:{type:String},
    }
)
module.exports=mongoose.model('user',user);