const {technologyModel}=require("../models/technologyModel")
const technology_post=async(req,res)=>
{
    try
    {
        const doc=new technologyModel({
            technology1:req.body.technology1,
            technology2:req.body.technology2,
            technology3:req.body.technology3
        })
        const result=await doc.save()
        console.log(result)
        res.send("successfull added technology")
    }
    catch(err)
    {
        console.log(err)
        res.send("failed in adding technology")
    }
}
module.exports={technology_post}