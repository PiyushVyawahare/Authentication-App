var registerBtn = document.getElementById("registerButton");
var email = document.getElementById("email");
var user = document.getElementById("user");
var pass = document.getElementById("pass");

registerBtn.addEventListener("click", onRegisterBtnClicked);


function onRegisterBtnClicked(){
    if(email.value && user.value && pass.value){
        var newUser = {
            email: email.value,
            username: user.value,
            password: pass.value
        }

        var request = new XMLHttpRequest();
        request.open("POST", "/register");
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(newUser));

        request.addEventListener("load", function(){
            window.location.href = "/";
            email.value = "";
            user.value = "";
            pass.value = "";
        });
    }
}