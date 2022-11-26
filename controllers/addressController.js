const {addressModel}=require("../models/addressModel")
const { check, validationResult } = require('express-validator');

const address_get=async(req,res)=>
{
    try
    {
        let total=await addressModel.countDocuments()
        const page=parseInt(req.query.page)?req.query.page:1
        const limit=parseInt(req.query.limit)?req.query.limit:3
        const search=req.query.search?req.query.search:""
        const totalPages=Math.ceil(total/limit)
        const result=await addressModel.find({
            "$or":[
                {"city":{$regex:search,$options:"i"}},
                {"country":{$regex:search,$options:"i"}},
                {"address1":{$regex:search,$options:"i"}},
                {"address2":{$regex:search,$options:"i"}},
            ]   
        })
       
        console.log(result);
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const resultUsers = result.slice(startIndex, endIndex)
        res.send({
            data:{resultUsers},
            meta:{
                total:total,
                currentPage:page,
                perPage:limit,
                totalPages:totalPages
            }
        })
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to get")
    }
}

const address_post=async(req,res)=>
{
    try
    {
        var validations =[
            check('country').trim().notEmpty().withMessage("country name required") ,
            check('city').not().isEmpty().withMessage('city is required'),
            check('address1').not().isEmpty().withMessage('address1 is required'),
            check('address2').not().isEmpty().withMessage('address2 is required'),
        ];
        for (let validation of validations)
         {
            var result1 = await validation.run(req);
            if (result1.errors.length) break;
        }
        var errors = validationResult(req);
        //validationResult
        //Extracts the validation errors from a request and makes them available in a Result object. Each error returned by . array() and . mapped() methods has the following format by default: { "msg": "The error message", "param": "param.


        if (errors.isEmpty()) {
            const doc=new addressModel({
                country:req.body.country,
                city:req.body.city,
                address1:req.body.address1,
                address2:req.body.address2
            })
            const result=await doc.save()
            console.log(result)
            res.send("successfull added address details")
        }
        else
        {
            res.json(errors)
            console.log(errors)
        }   
    }
    catch(err)
    {
        console.log(err)
        res.send("failed in adding address details")
    }
}

const address_update=async(req,res)=>
{
    try
    {
        const result=await addressModel.findByIdAndUpdate(req.query.id,req.body)
        console.log(result)
        res.send("updated successfully")
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to update")
    }
}


const address_delete=async(req,res)=>
{
    try
    {
        const result=await addressModel.findByIdAndDelete(req.query.id)
        console.log(result)
        res.send("Deleted successfully")
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to Delete")
    }
}

module.exports={address_post,address_get,address_update,address_delete}