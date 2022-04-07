var username = document.getElementById("username");
var password = document.getElementById("password");
var logInBtn = document.getElementById("logInButton");


logInBtn.addEventListener("click", onLogInBtnClicked);

function onLogInBtnClicked(){
    if(username.value && password.value){
        var user = {
            username: username.value,
            password: password.value
        }

        var request = new XMLHttpRequest();
        request.open("POST", "/login");
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(user));

        request.addEventListener("load", function(){
            if(request.responseText === "true"){
                console.log(user.username);
                getUserDetails(user.username);
                username.value = "";
                password.value = "";
            }
        });
    }
}

function getUserDetails(username){
    var user = {
        username: username
    }
    var request = new XMLHttpRequest();
    request.open("POST", "/getUser");
    request.setRequestHeader("Content-type", "application/json");
    console.log(user);
    request.send(JSON.stringify(user));

    request.addEventListener("load", function(){    
        window.location.href = "/loggedin.html";
    });
}

