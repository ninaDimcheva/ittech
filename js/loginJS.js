function loginValidate(){
    var email = document.getElementById('email').value;
    var atSign = email.indexOf("@");
    var dot = email.lastIndexOf(".");
    var emailWorn = document.getElementById('emailWorn');
    var password = document.getElementById('password').value;
    var passwordWorn = document.getElementById('passwordWorn');
    var loginWarn = document.getElementById('loginWarn');

    if (email.length > 0 && email.length < 45 && atSign > 1 && (dot - atSign) > 2 && dot < (email.length - 2)){
        emailWorn.innerText = 'OK';
    }else {
        emailWorn.innerText = 'NOT OK';
    }

    if (password.length > 5 && password.length < 45){
        passwordWorn.innerText = 'OK';
    }else {
        passwordWorn.innerText = 'NOT OK';
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200){
                if(this.responseText == "false"){
                    loginWarn.innerText = 'Invalid email or password';
                }
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/loginController.php?login");
    request.send();
}