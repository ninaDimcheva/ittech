

function registerValidate(){
    var name = document.getElementById('name').value;
    var nameWarn = document.getElementById('nameWarn');
    var familyName = document.getElementById('familyName').value;
    var familyNameWarn = document.getElementById('familyNameWarn');
    var email = document.getElementById('email').value;
    var atSign = email.indexOf("@");
    var dot = email.lastIndexOf(".");
    var emailWarn = document.getElementById('emailWarn');
    var password = document.getElementById('password').value;
    var passwordWarn = document.getElementById('passwordWarn');
    var confirmPassword = document.getElementById('confirmPassword').value;
    var confirmPasswordWarn = document.getElementById('confirmPasswordWarn');
    var day = document.getElementById('day').value;
    var month = document.getElementById('month').value;
    var year = document.getElementById('year').value;
    var birthdayWarn = document.getElementById('birthdayWarn');
    var terms = document.getElementById('terms');
    var termsWarn = document.getElementById('termsWarn');
    var error = false;

    var checkMark = document.createElement('img');
    checkMark.src = 'http://localhost/ittech/assets/displayImages/checkMark.png';
    checkMark.className = 'checkMark';

    if (name.length > 0 && name.length < 45 && !/\d/.test(name)){
        nameWarn.innerHTML = '';
        nameWarn.appendChild(checkMark);
    }else {
        error = true;
        nameWarn.innerText = 'NOT OK';
    }
    if (familyName.length > 0 && familyName.length < 45 && !/\d/.test(familyName)){
        familyNameWarn.innerHTML = '';
        familyNameWarn.appendChild(checkMark);
    }else {
        error = true;
        familyNameWarn.innerText = 'NOT OK';
    }
    if (email.length > 0 && email.length < 45 && atSign > 1 && (dot - atSign) > 2 && dot < (email.length - 2)){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    if (this.responseText){
                        emailWarn.innerText = 'The e-mail is already registered';
                    }else {
                        emailWarn.innerHTML = '';
                        emailWarn.appendChild(checkMark);
                    }
                }
            }
        };
        request.open("GET", "http://localhost/ittech/controller/registerController.php?existsUser=" + email);
        request.send();
    }else {
        error = true;
        emailWarn.innerText = 'NOT OK';
    }
    if (password.length > 5 && password.length < 45){
        passwordWarn.innerHTML = '';
        passwordWarn.appendChild(checkMark);
    }else {
        error = true;
        passwordWarn.innerText = 'NOT OK';
    }
    if (confirmPassword.length > 5 && confirmPassword.length < 45 && confirmPassword === password){
        confirmPasswordWarn.innerHTML = '';
        confirmPasswordWarn.appendChild(checkMark);
    }else {
        error = true;
        confirmPasswordWarn.innerText = 'NOT OK';
    }
    if (day !== 'Day' && month !== 'Month' && year !== 'Year'){
        birthdayWarn.innerHTML = '';
        birthdayWarn.appendChild(checkMark);
    }else {
        error = true;
        birthdayWarn.innerText = 'NOT OK';
    }
    if (terms.checked){
        termsWarn.innerText = '';
        termsWarn.appendChild(checkMark);
    }else {
        error = true;
        termsWarn.innerText = 'The field is required';
    }

    if (!error){
        document.getElementById('regButton').disabled = false;
    }else {
        document.getElementById('regButton').disabled = true;
    }
}

