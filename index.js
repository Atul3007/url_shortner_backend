const express=require("express");
const app=express();



app.get("/",(req,res)=>{
    try {
        res.send("welcome")
    } catch (error) {
        console.log(error)
    }
})

app.listen(8000,(req,res)=>{
    try {
        console.log("listening on 8000")
    } catch (error) {
        console.log("error in connecting")
    }
})