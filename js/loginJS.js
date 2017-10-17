function loginValidate(){
    var loginWarning = document.getElementById('loginWarning');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200){
                var validationResult = this.responseText;
                if(validationResult){
                    loginWarning.innerText = 'Invalid e-mail or password';
                }
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/loginController.php?loginValidation");
    request.send();
}