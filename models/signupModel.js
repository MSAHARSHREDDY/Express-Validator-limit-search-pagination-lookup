const mongoose=require("mongoose")
const signupSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cpassword:{type:String,required:true},
    created_at : { type: Date, default:null, default: Date.now },
    deleted_at:{type:Date,default:null,default: Date.now}
})
const signupModel=mongoose.model("signup",signupSchema)
module.exports={signupModel}