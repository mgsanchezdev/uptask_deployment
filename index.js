const express = require("express");

//Create an express app
const app = express();



//Route to home
app.use('/',(req,res)=>{
    res.json("Hola")
})

app.listen(3000);
