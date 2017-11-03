
function inputValidation(){
    var name = document.getElementById('name').value;
    var nameWarn = document.getElementById('nameWarn');
    var familyName = document.getElementById('familyName').value;
    var familyNameWarn = document.getElementById('familyNameWarn');
    var email = document.getElementById('email').value;
    var emailWarn = document.getElementById('emailWarn');
    var atSign = email.indexOf("@");
    var dot = email.lastIndexOf(".");
    var phoneNumber = document.getElementById('phoneNumber').value;
    var phoneNumberWarn = document.getElementById('phoneNumberWarn');
    var message = document.getElementById('message').value;
    var messageWarn = document.getElementById('messageWarn');
    var error = false;

    if (name.length > 0 && name.length < 45 && !/\d/.test(name)){
        nameWarn.innerText = '✔';
        nameWarn.style.color = 'green';
    }else {
        error = true;
        nameWarn.innerText = '✘';
        nameWarn.style.color = '#e60000';
    }

    if (familyName.length > 0  && familyName.length < 45 && !/\d/.test(familyName)){
        familyNameWarn.innerText = '✔';
        familyNameWarn.style.color = 'green';
    }else {
        error = true;
        familyNameWarn.innerText = '✘';
        familyNameWarn.style.color = '#e60000';
    }
    if (email.length > 0 && email.length < 45 && atSign > 1 && (dot - atSign) > 2 && dot < (email.length - 2)){
        emailWarn.innerText = '✔';
        emailWarn.style.color = 'green';
    }else {
        error = true;
        emailWarn.innerText = '✘';
        emailWarn.style.color = '#e60000';
    }
    if (phoneNumber.length > 10 && phoneNumber.length < 45 && /\d/.test(phoneNumber) && phoneNumber.charAt(0) == '+'){
        phoneNumberWarn.innerText = '✔';
        phoneNumberWarn.style.color = 'green';
    }else {
        error = true;
        phoneNumberWarn.innerText = '✘';
        phoneNumberWarn.style.color = '#e60000';
    }
    if(message.length > 0 && message.length < 500){
        messageWarn.innerText = '✔';
        messageWarn.style.color = 'green';
    }else{
        error = true;
        messageWarn.innerText = '✘';
        messageWarn.style.color = '#e60000';
    }

    if(!error){
        document.getElementById('contactUsButton').disabled = false;
    }else {
        document.getElementById('contactUsButton').disabled = true;
    }
}


