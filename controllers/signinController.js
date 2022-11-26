
const { signupModel } = require("../models/signupModel")
const bcrypt=require("bcrypt")
const { check, validationResult } = require('express-validator');

const signin_post=async(req,res)=>
{
    try
    {
        var validations =[
          
            check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('please enter valid email'),
            check('password').not().isEmpty().withMessage('password is required')
            ];
            for (let validation of validations)
                {
                    var result1 = await validation.run(req);
                    if (result1.errors.length) break;
                }
        var errors = validationResult(req);
        //validationResult
        //Extracts the validation errors from a request and makes them available in a Result object. Each error returned by . array() and . mapped() methods has the following format by default: { "msg": "The error message", "param": "param.
        if(errors.isEmpty())
        {
            const {email,password}=req.body
            const result=await signupModel.findOne({email:email})
            
            if(result!=null)
            {
                const isMatch=await bcrypt.compare(password,result.password)
                if(email===email &&isMatch)
                {
                    res.send({success:"successfull signin"})
                }
                else
                {
                   res.send({errors:"verify your email and password"})
                }
            }
            else
            {
                res.send("you are not a registered user")
            }
    
        }
        else
        {
            res.json(errors)
            console.log(errors)
        }
        
    }
    catch(err)
    {
        res.send("failed in signin post")
        console.log(err)

    }
}

const signin_get=async(req,res)=>
{
    try
    {
        const result=await signupModel.find()
        console.log(result)
        res.send({data:result})
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to get")
    }
}

const signin_delete=async(req,res)=>
{
    try
    {
        const result=await signupModel.findByIdAndDelete(req.query.id)
        console.log(result)
        res.send({data:"deleted successfull"})
    }
    catch(err)
    {
        console.log(err)
        res.send("failed to delete")
    }
}

module.exports={signin_post,signin_get,signin_delete}