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
    var male = document.getElementById('male');
    var female = document.getElementById('female');
    var genderWarn = document.getElementById('genderWarn');
    var terms = document.getElementById('terms');
    var termsWarn = document.getElementById('termsWarn');
    var error = false;

    if (name.length > 0 && name.length < 45 && !/\d/.test(name)){
        nameWarn.innerText = '✔';
        nameWarn.style.color = 'green';
    }else {
        error = true;
        nameWarn.innerText = '✘';
        nameWarn.style.color = '#e60000';
    }
    if (familyName.length > 0 && familyName.length < 45 && !/\d/.test(familyName)){
        familyNameWarn.innerText = '✔';
        familyNameWarn.style.color = 'green';
    }else {
        error = true;
        familyNameWarn.innerText = '✘';
        familyNameWarn.style.color = '#e60000';
    }
    if (email.length > 0 && email.length < 45 && atSign > 1 && (dot - atSign) > 2 && dot < (email.length - 2)){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    if (this.responseText){
                        emailWarn.innerText = 'The e-mail is already registered';
                    }else {
                        emailWarn.innerText = '✔';
                        emailWarn.style.color = 'green';
                    }
                }else {
                    window.location.replace('http://localhost/ittech?page=error500');
                }
            }
        };
        request.open("GET", "http://localhost/ittech/controller/registerController.php?existsUser=" + email);
        request.send();
    }else {
        error = true;
        emailWarn.innerText = '✘';
        emailWarn.style.color = '#e60000';
    }
    if (password.length > 5 && password.length < 45){
        passwordWarn.innerText = '✔';
        passwordWarn.style.color = 'green';

    }else {
        error = true;
        passwordWarn.innerText = '✘';
        passwordWarn.style.color = '#e60000';
    }
    if (confirmPassword.length > 5 && confirmPassword.length < 45 && confirmPassword === password){
        confirmPasswordWarn.innerText = '✔';
        confirmPasswordWarn.style.color = 'green';
    }else {
        error = true;
        confirmPasswordWarn.innerText = '✘';
        confirmPasswordWarn.style.color = '#e60000';
    }
    if (day !== 'Day' && month !== 'Month' && year !== 'Year'){
        birthdayWarn.innerText = '✔';
        birthdayWarn.style.color = 'green';
    }else {
        error = true;
        birthdayWarn.innerText = '✘';
        birthdayWarn.style.color = '#e60000';
    }
    if(male.checked || female.checked){
        genderWarn.innerText = '✔';
        genderWarn.style.color = 'green';
    }else {
        genderWarn.innerText = '✘';
        genderWarn.style.color = '#e60000';
    }
    if (terms.checked){
        termsWarn.innerText = '✔';
        termsWarn.style.color = 'green';
    }else {
        error = true;
        termsWarn.innerText = '✘';
        termsWarn.style.color = '#e60000';
    }

    if (!error){
        document.getElementById('regButton').disabled = false;
    }else {
        document.getElementById('regButton').disabled = true;
    }
}

