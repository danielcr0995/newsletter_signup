const express=require('express');
const bodyParser=require('body-parser');
const request = require('request')
const https= require('https');
const app= express();


app.use(bodyParser.urlencoded({extended:true})); // read data that is entered in a form

app.use(express.static('public')); // used files tat are inclduded in main html file

app.get('/', function(req,res){
    res.sendFile(__dirname+ '/signup.html');
})

app.post('/', function (req,res){
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:'subscribed',
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url= 'https://us20.api.mailchimp.com/3.0/lists/fa5b3f6dbf';

    const options={
        method:'POST',
        auth:'daniel1:190d21abf6b19f943bd5b6423f6a16f3-us20'
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode===200){
            res.sendFile(__dirname +'/succes.html');
        }else{
            res.sendFile(__dirname +'/failure.html');
        }
        response.on('data', function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();

    // cnsole.log(firstName, lastName, email);
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.post("/success", function(req,res){
    res.redirect("/");
});



// mailchimp api key
// 190d21abf6b19f943bd5b6423f6a16f3-us20 

// server
// us20

// list id
// fa5b3f6dbf 

app.listen(3000, function(){
    console.log('Server started on port 3000');
})