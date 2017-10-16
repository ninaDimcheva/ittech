function loginValidate(){
    var loginValidate = document.getElementById('loginValidate');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200){
                var validationResult = this.responseText;
                alert(validationResult);
                if(validationResult == 'dont'){
                    loginValidate.innerText = 'Invalid e-mail or password';
                }
                else{
                    loginValidate.innerText = 'Valid';
                }
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/loginController.php?loginValidation");
    request.send();
}