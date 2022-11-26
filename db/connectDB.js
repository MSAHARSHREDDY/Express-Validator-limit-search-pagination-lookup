const mongoose=require("mongoose")
const connectDB=async(req,res)=>
{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/studentDataBase")
        console.log("connected successfull")
    }
    catch(err)
    {
        console.log(err)
    }
}
module.exports={connectDB}