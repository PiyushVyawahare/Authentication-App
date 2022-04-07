const express = require("express");
const fs = require("fs");

var app = express();

app.use(express.json());
app.use(express.static("public"));

function readContent(path, callback){
    fs.readFile(path, "utf-8", function(err, data){
        callback(data);
    });
}

app.post("/login", function(req, res){
    readContent("db.txt", function(data){
        var users = [];
        if(data.length>0){
            users = JSON.parse(data);
        }
        var user = req.body;
        for(var i = 0; i < users.length; i++){
            if(users[i].username === user.username && users[i].password === user.password){
                res.end("true");
            }
        }
        
        res.end();
    });
});

app.post("/getUser", function(req, res){
    readContent("public/loggedin.html", function(data){
        var user = req.body;
        fs.writeFile("public/loggedin.html", "<h1>Hello " + user.username+"</h1>", function(err){
            if(err)
                res.end("error occured!!")
            res.end();
        });
    })
});

app.post("/register", function(req, res){
    readContent("db.txt", function(data){
        var users = [];
        if(data.length>0){
            users = JSON.parse(data);
        }
        users.push(req.body);
        fs.writeFile("db.txt", JSON.stringify(users), function(err){
            if(err)
                res.end("error occured!!");
            res.end();
        })
    })
});

app.listen(3000, function(){
    console.log("server running at port 3000");
});
