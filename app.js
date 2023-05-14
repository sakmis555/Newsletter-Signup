const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();


// to use the body-parser module
app.use(bodyParser.urlencoded({extended: true}));

// to use the static files under public folder 
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;


    var data = {
        members: [
            {
                email_address: email,
                status : "subscribed",
                merge_fiels : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/24688f615b";

    const options = {
        method : "POST",
        auth : "sakmis555:b3c18e598b8595994634ec8563a78a1-us9"
    }
    const request = https.request(url, options, function(response){
        const statusCode = response.statusCode;
        if( statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            // console.log(JSON.parse(data));
        })
    });
    

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on Port 3000");
});

//API Key
// 0b3c18e598b8595994634ec8563a78a1-us9

//List ID
// 24688f615b