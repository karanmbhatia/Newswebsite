const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/public",express.static("public"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sagar@123",
    database: "nodejs"
});

// Connect to the database
connection.connect(function(error) {
    if (error) {
        console.error("Error connecting to the database:", error.stack);
        return;
    }
    
    console.log("Connected to the database successfully!");

});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("http://localhost/WebDevelopment/Newsportal/index.html");
        } else {
            res.redirect("/");

        }
        res.end();
    })
})

//when login is success
app.get("/index", function(req,res){
    res.sendFile("http://localhost/WebDevelopment/Newsportal/index.html")
})

//set app port
app.listen(4200);