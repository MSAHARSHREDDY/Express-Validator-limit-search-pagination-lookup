const express=require("express")
const router=express.Router()
const {signup_post, signup_get}=require("../controllers/signupController")
const {signin_post, signin_get, signin_delete}=require("../controllers/signinController")
//address
const { address_post, address_get, address_update, address_delete } = require("../controllers/addressController")
//education
const { education_post, educationAddressLookup, educationTechnologyLookup ,educationAddressTechnologyLookup, education_get, education_update, education_delete} = require("../controllers/educationController")
//technology
const { technology_post } = require("../controllers/technologyController")


//signup
router.post("/signup",signup_post)
router.get("/signup",signup_get)


//signin
router.post("/signin",signin_post)
router.get("/signin",signin_get)
router.post("/signinDelete",signin_delete)

//address
router.post("/address",address_post)
router.get("/address",address_get)
router.post("/addressUpdate",address_update)
router.post("/addressDelete",address_delete)

//education
router.post("/education",education_post)
router.get("/education",education_get)
router.post("/educationUpdate",education_update)
router.post("/educationDelete",education_delete)
router.get("/educationAddressLookup",educationAddressLookup)
router.get("/educationTechnologyLookup",educationTechnologyLookup)
router.get("/educationAddressTechnologyLookup",educationAddressTechnologyLookup)

//technology
router.post("/technology",technology_post)


module.exports={router}
