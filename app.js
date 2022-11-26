const express=require("express")
const {connectDB}=require("./db/connectDB")
const {router}=require("./routes/web")
const app=express()

const port=8000

connectDB()

app.use(express.json())

app.use("/",router)

app.listen(port,()=>
{
    console.log(`listening on port ${port}`)
})