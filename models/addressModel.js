const mongoose=require("mongoose")
const addressSchema=new mongoose.Schema({
    country:{type:String,required:true},
    city:{type:String,required:true},
    address1:{type:String,required:true},
    address2:{type:String,required:true},
    created_at:{type:Date,default:null,default: Date.now },
    updated_at:{type:Date,default:null,default: Date.now }

})
//creating collection
const addressModel=mongoose.model("address",addressSchema)
module.exports={addressModel}