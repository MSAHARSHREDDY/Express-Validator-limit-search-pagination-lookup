const mongoose=require("mongoose")
const educationSchema=new mongoose.Schema({
        ssc:{type:Number,required:true},
        inter:{type:Number,required:true},
        BTech:{type:Number,required:true},
        created_at:{type:Date,default:null,default: Date.now },
        updated_at:{type:Date,default:null,default: Date.now },
        address_details_id:{type:mongoose.Schema.Types.ObjectId,ref:"address"},
        technology_details_id:{type:mongoose.Schema.Types.ObjectId,ref:"technology"}

})
const educationModel=mongoose.model("education",educationSchema)
module.exports={educationModel}