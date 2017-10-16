function loginValidate(){
    var loginValidate = document.getElementById('loginValidate');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200){
                var validationResult = this.responseText;
                if(validationResult == true){
                    loginValidate.innerText = 'Invalid e-mail or password';
                }
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/loginController.php?loginValidation");
    request.send();
}