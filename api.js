const express = require('express');
// import  express
const app = express();
// syntax -> used to create ann express framework

/**********
 * app.use -> a method -> express
 * we can pass a handler/cb fn ->
 * 1. req : obj representing request
 * 2. res : obj representing response
 * 3. this method irrespective of the call done by either get/post/ete this will respond
 * ***********/

// when someone makes a get request on the route /api/ user , the handler will be executed
app.get("/api/user/",function (req,res){
    console.log("Im inside get method");
    res.status(200).json({
        status:"success",
        message:"sending response from get method",
    })
})

app.get("/api/user",function (req,res){
    console.log("Im inside get method");
    res.status(200).json({
        status:"success",
        message:"sending response from get method",
    })
})

app.use(function cb(req,res){
    res.status(200).json({
        status:"success",
        message:"got the request from app.use method",
    })
})

const port = process.env.PORT || 3000
// server -> run on a port
app.listen(port,function(){
    console.log(`Server is listening at ${port}`);
})