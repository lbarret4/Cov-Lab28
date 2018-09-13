const express = require('express');
const path = require('path');
const fs = require('fs')
const bodyParser = require('body-parser');
let app = express ();
const PORT =3000;
let publicPath = path.join(__dirname,'../public');


app.use('/',(req,res,next) =>{
    console.log(req.url)
    next();
});

// Sends response message when the root is requested
/* app.get('/',(req,res) => {
    res.send("Hello from the web server side...");
    
}); */

app.use(bodyParser.urlencoded({extended:false}));

app.post('/formsubmissions',(req,res) =>{
    let data = {
        "First Name":req.body["first_name"],
        "Last Name":req.body["last_name"],
        email:req.body.email,
    };
    fs.writeFile(path.join(__dirname,'../formsubmissions.json'),JSON.stringify(data),(err) => {
        if(err) throw err;
        console.log('The file has been saved');
    });
    fs.readFile(path.join(__dirname,'../formsubmissions.json'),(err, data) => {
        if (err) throw err;
        let formData = JSON.parse(data);
        console.log('The file has been read');
        res.send(formData);
    });
    
});

app.use(express.static(publicPath));

app.listen(PORT);