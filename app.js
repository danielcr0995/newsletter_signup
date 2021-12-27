const express=require('express');
const bodyParser=require('body-parser');
const request = require('request')
const app= express();


app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.send('hola');
})


app.listen(3000, function(){
    console.log('Server started');
})