const { signupModel } = require("../models/signupModel")
const bcrypt=require("bcrypt")
const { check, validationResult } = require('express-validator');
const signup_post = async (req, res) => {
    try {

        var validations =[
            check('name').trim().notEmpty().withMessage(" name is required") ,
            check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('please enter valid email'),
            check('password').not().isEmpty().withMessage('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
            check('cpassword').not().isEmpty().withMessage('confirm Password is required') .custom((value,{req}) =>{
                if(value !== req.body.password)
                {
                    throw new Error('Password confirmation does not match with password')
                }
                else                                                     
                {
                    return true;             
                }
                /*----If u doesnot write else statement it return below error*/
                // {
                //     "errors": [
                //         {
                //             "value": "suresh123",
                //             "msg": "Invalid value",
                //             "param": "cpassword",
                //             "location": "body"
                //         }
                //     ]
                // }
            })
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
            const {name,email,password,cpassword} = req.body
            const result = await signupModel.findOne({ email: email })
            if (result)
             {
                res.send({
                    errors:"email already exists"
                })
            }
            else
            {
                const hashPassword= await bcrypt.hash(req.body.password,10)
                const hashPassword1= await bcrypt.hash(req.body.cpassword,10)
                const doc=new signupModel({
                    name:req.body.name,
                    email:req.body.email,
                    password:hashPassword,
                    cpassword:hashPassword1
                })
                const result= await doc.save()
                console.log(result)
                res.send("signup success")
        }
            }
        else
        {
            res.json(errors)
            console.log(errors)
        }
    }
    catch (err) {
        console.log(err)
        res.send("failed in controller post")
    }
}


const signup_get=async(req,res)=>
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


module.exports = { signup_post,signup_get}