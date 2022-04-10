const express = require("express");
const fs = require("fs");
const session = require("express-session");

var app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: 'keyword cat',
    saveUninitialized: true
}));


function readContent(callback){
    fs.readFile("db.txt", "utf-8", function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            var users = [];
            if(data)
                users = JSON.parse(data);
            callback(null, users);
        }
    });
}

app.get("/", function(req, res){
    if(req.session.isLoggedIn)
        res.sendFile(__dirname+"/public/home.html");
    else
        res.redirect("/login.html")
});

app.get("/getUsername", function(req, res){
    res.end(req.session.username);
})

app.post("/register", function(req, res){
    var newUser = req.body;

    readContent(function(err, users){
        if(err){
            res.status(404);
            res.end("File not found");
        }
        else{ 
            var ourUser = users.filter(function(user){
                if(user.email === newUser.email)
                return true;
            })
            if(ourUser.length){
                res.status(409);
                res.end("user already exist");
            }
            else{
                users.push(newUser);
                fs.writeFile("db.txt", JSON.stringify(users), function(err){
                    if(err){
                        res.end(404);
                        res.end("error occured")
                    }
                    else{
                        res.status(200)
                        res.end("registration successful")
                    }
                })
            }      
        }
    })
})

app.post("/login", function(req, res){
    var username =  req.body.username;
    var password = req.body.password;

    readContent(function(err, users){
        if(err){
            res.status(404);
            res.end("File not found");
        }
        else{
            var ourUser = users.filter(function(user){
                if(user.username === username && user.password === password)
                    return true;
            })

            if(ourUser.length){
                req.session.isLoggedIn = true;
                req.session.username = ourUser[0].username;
                res.status(200);
                res.end("login success");
            }
            else{
                res.status(404);
                res.end("Username or password is incorrect");
            }
        }
    });
});

app.get("/logout", function(req, res){
    req.session.destroy();
    res.end();
})


app.listen(3000, function(){
    console.log("server running at port 3000");
});
