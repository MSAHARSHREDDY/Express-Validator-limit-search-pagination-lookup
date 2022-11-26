const { educationModel } = require("../models/educationModel")
const { check, validationResult } = require('express-validator');

const education_get=async(req,res)=>
{
    try
    {
        const page=parseInt(req.query.page)?req.query.page:1
        const limit=parseInt(req.query.limit)?req.query.limit:3
        const search=req.query.search?req.query.search:""
        const result=await educationModel.find({
            "$or":[
                {"ssc":parseFloat(search)},
                { "inter": parseInt(search) },
                { "BTech": parseInt(search) },

            ]
        })
        console.log(result)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const resultUsers = result.slice(startIndex, endIndex)
        res.send({
            data:{resultUsers}
        })
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to get")
    }
}


const education_post = async (req, res) => {
    try {
        var validations =[
            check('ssc').trim().notEmpty().withMessage("ssc marks required") ,//.notEmpty()Adds a validator to check if a value is not empty; that is, a string with a length of 1 or bigger. check('username'). notEmpty();
            check('inter').not().notEmpty().withMessage('inter marks required'),
            check('BTech').not().notEmpty().withMessage('BTech marks required'),
        ];
        for (let validation of validations)
         {
            var result1 = await validation.run(req);
            if (result1.errors.length) break;
        }
        var errors = validationResult(req);
        //validationResult
        //Extracts the validation errors from a request and makes them available in a Result object. Each error returned by . array() and . mapped() methods has the following format by default: { "msg": "The error message", "param": "param.
        if (errors.isEmpty()){
            const doc = new educationModel({
                ssc: req.body.ssc,
                inter: req.body.inter,
                BTech: req.body.BTech,
                address_details_id: req.body.address_details_id,
                technology_details_id: req.body.technology_details_id
    
            })
            const result = await doc.save()
            console.log(result)
            res.send("successfull in adding education details")
        }
        else
        {
            res.json(errors)
            console.log(errors)
        }
        
    }
    catch (err) {
        console.log(err)
        res.send("failed in adding education details")
    }
}

const education_update=async(req,res)=>
{
    try
    {
        const result=await educationModel.findByIdAndUpdate(req.query.id,req.body)
        console.log(result)
        res.send("updated successfully")
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to update")
    }
}


const education_delete=async(req,res)=>
{
    try
    {
        const result=await educationModel.findByIdAndDelete(req.query.id)
        console.log(result)
        res.send("Deleted successfully")
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to Delete")
    }
}

const educationAddressLookup = async (req, res) => {
    try {
        const result = await educationModel.aggregate([
             
            {
                
                $lookup:
                {
                    from: "addresses",//collection name need to be taken from database
                    localField: "address_details_id",//address_details_id taken from education Model
                    foreignField: "_id",//This _id is from education collection
                    as: "AddressDetails"
                },
                
            },
           
            { $unwind: "$AddressDetails" },
           

        ])
        console.log(result)
        res.send({
            data: {
                result
            }
        })
    }
    catch (err) {
        console.log(err)
        res.send("failed in addressLookup")
    }
}

const educationTechnologyLookup = async (req, res) => {
    try {
        const result = await educationModel.aggregate([
            {
                $lookup:
                {
                    from: "technologies",//collection name need to be taken from database
                    localField: "technology_details_id",//technology_details_id  taken from education Model
                    foreignField: "_id",//This _id is from education collection
                    as: "Technologies"
                }
            },
            { $unwind: "$Technologies" }
        ])
        console.log(result)
        res.send({
            data: {
                result
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}


const educationAddressTechnologyLookup = async (req, res) => {
    try {
        let page=parseInt(req.query.page)?req.query.page:1;
        let limit=parseInt(req.query.limit)?req.query.limit:3
        let search = req.query.search ? req.query.search : "";

        
        const result = await educationModel.aggregate([
            {
                $lookup:
                {
                    from: "addresses",//collection name need to be taken from database
                    localField: "address_details_id",//address_details_id taken from education Model
                    foreignField: "_id",//This _id is from education collection
                    as: "AddressDetails"
                }
            },
           
            { $unwind: "$AddressDetails" },
            {
                $lookup:
                {
                    from: "technologies",//collection name need to be taken from database
                    localField: "technology_details_id",//technology_details_id  taken from education Model
                    foreignField: "_id",//This _id is from education collection
                    as: "Technologies"
                }
            },
            { $unwind: "$Technologies" },

         
            {
                $match: {
                    $or: [
                        { "AddressDetails.state": { $regex: search, $options: "i" } },
                        { "AddressDetails.city": { $regex: search, $options: "i" } },
                        { "AddressDetails.address1": { $regex: search, $options: "i" } },
                        { "AddressDetails.address2": { $regex: search, $options: "i" } },
                        { "AddressDetails.country": { $regex: search, $options: "i" } },
                        { "Technologies.technology1": { $regex: search, $options: "i" } },
                        { "Technologies.technology2": { $regex: search, $options: "i" } },
                        { "Technologies.technology3": { $regex: search, $options: "i" } },
                        {"ssc":parseFloat(search)},
                        { "inter": parseInt(search) },
                        { "BTech": parseInt(search) },

                    ]
                }
            },

        ])
        console.log(result)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const resultUsers = result.slice(startIndex, endIndex)
        res.send({
            data: {
                resultUsers
            }
        })
    }
    catch (err) {
            console.log(err)
    }
}


module.exports = { 
    education_post,
     educationAddressLookup,
      educationTechnologyLookup,
       educationAddressTechnologyLookup,
       education_get,education_update,
       education_delete 
    }