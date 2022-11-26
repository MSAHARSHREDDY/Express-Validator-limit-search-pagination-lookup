const mongoose=require("mongoose")
const technologySchema=new mongoose.Schema({
    technology1:{type:String,required:true},
    technology2:{type:String,required:true},
    technology3:{type:String,required:true},
    created_at:{type:Date,default:null,default: Date.now },
    updated_at:{type:Date,default:null,default: Date.now },

})
const technologyModel=mongoose.model("technology",technologySchema)
module.exports={technologyModel}