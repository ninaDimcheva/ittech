// the function validates the phone number fallowing the pattern +XXX-XXX-XXXXXX;
function phonenumber(inputtxt)
{
    var phoneno = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{6})$/;
    if((inputtxt.value.match(phoneno)))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function inputValidation(){
    var name = document.getElementById('name').value;
    var nameWorn = document.getElementById('nameWarn');
    var email = document.getElementById('email').value;
    var atSign = email.indexOf("@");
    var dot = email.lastIndexOf(".");
    var emailWorn = document.getElementById('emailWorn');
    var phoneNumber = document.getElementById('phoneNumber').value;
    var phoneNumberWorn = document.getElementById('phoneNumberWorn');
    var message = document.getElementById('message').value;
    var messageWorn = document.getElementById('messageWorn');
    var securityCode = document.getElementById('securityCode').value;
    var securityCodeWorn = document.getElementById('securityCodeWorn');
    var systemSecurityCode = document.getElementById('securityCode').innerHTML;
    var error = false;

    if (name.length > 0 && name.length < 45 && !/\d/.test(name)){
        nameWorn.innerText = 'OK';
    }else {
        error = true;
        nameWorn.innerText = 'NOT OK';
    }
    if (email.length > 0 && email.length < 45 && atSign > 1 && (dot - atSign) > 2 && dot < (email.length - 2)){
        emailWorn.innerText = 'OK';
    }else {
        error = true;
        emailWorn.innerText = 'NOT OK';
    }
    if(phonenumber(phoneNumber)){
        phoneNumberWorn.innerText = 'OK';
    }else{
        error = true;
        phoneNumberWorn.innerText = 'NOT OK';
    }
    if(message.length === 0){
        message.innerText = 'OK';
    }else{
        error = true;
        messageWorn.innerText = 'NOT OK';
    }

    if(!error && securityCode !== systemSecurityCode){
        document.getElementById('sendEmail').disabled = false;
    }else {
        document.getElementById('sendEmail').disabled = true;
    }
}


