function openTerms() {
    window.open("http://localhost/ittech/view/termsForOnlineShopping.html");
}

function registerValidate(){
    var name = document.getElementById('name').value;
    var nameWorn = document.getElementById('nameWarn');
    var familyName = document.getElementById('familyName').value;
    var familyNameWorn = document.getElementById('familyNameWorn');
    var email = document.getElementById('email').value;
    var atSign = email.indexOf("@");
    var dot = email.lastIndexOf(".");
    var emailWorn = document.getElementById('emailWorn');
    var password = document.getElementById('password').value;
    var passwordWorn = document.getElementById('passwordWorn');
    var confirmPassword = document.getElementById('confirmPassword').value;
    var confirmPasswordWorn = document.getElementById('confirmPasswordWorn');
    var day = document.getElementById('day').value;
    var month = document.getElementById('month').value;
    var year = document.getElementById('year').value;
    var birthdayWorn = document.getElementById('birthdayWorn');
    var error = false;

    if (name.length > 0 && name.length < 45 && !/\d/.test(name)){
        nameWorn.innerText = 'OK';
    }else {
        error = true;
        nameWorn.innerText = 'NOT OK';
    }
    if (familyName.length > 0 && familyName.length < 45 && !/\d/.test(familyName)){
        familyNameWorn.innerText = 'OK';
    }else {
        error = true;
        familyNameWorn.innerText = 'NOT OK';
    }
    if (email.length > 0 && email.length < 45 && atSign > 1 && (dot - atSign) > 2 && dot < (email.length - 2)){
        emailWorn.innerText = 'OK';
    }else {
        error = true;
        emailWorn.innerText = 'NOT OK';
    }
    if (password.length > 0 && password.length < 45){
        passwordWorn.innerText = 'OK';
    }else {
        error = true;
        passwordWorn.innerText = 'NOT OK';
    }
    if (confirmPassword.length > 0 && confirmPassword.length < 45 && confirmPassword === password){
        confirmPasswordWorn.innerText = 'OK';
    }else {
        error = true;
        confirmPasswordWorn.innerText = 'NOT OK';
    }
    if (day !== 'Day' && month !== 'Month' && year !== 'Year'){
        birthdayWorn.innerText = 'OK';
    }else {
        error = true;
        birthdayWorn.innerText = 'NOT OK';
    }



    if (!error){
        document.getElementById('regButton').disabled = false;
    }else {
        document.getElementById('regButton').disabled = true;
    }
}