function showMyProfile() {
    if (self.location == 'http://localhost/ittech/?page=myProfile') {
        var getUserProfile = new XMLHttpRequest();
        getUserProfile.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var userProfile = JSON.parse(this.responseText);
                    if(userProfile.is_admin){
                        var liToDelete = document.getElementById('myOrders');
                        liToDelete.innerHTML = '';
                        var addNewProduct = document.createElement('a');
                        addNewProduct.href = '?page=addProduct';
                        addNewProduct.innerHTML = 'Add new product';
                        liToDelete.appendChild(addNewProduct);

                        var secondLiToDelete = document.getElementById('myFavourites');
                        secondLiToDelete.innerHTML = '';
                        var privileges = document.createElement('a');
                        privileges.href = '?page=editUserPrivilege';
                        privileges.innerHTML = 'Edit user privileges';
                        secondLiToDelete.appendChild(privileges);
                    }
                    var name = document.getElementById('myProfileName');
                    name.innerText = capitalizeFirstLetter(userProfile.name);

                    var familyName = document.getElementById('myProfileFamilyName');
                    familyName.innerText = capitalizeFirstLetter(userProfile.family_name);

                    var email = document.getElementById('myProfileEmail');
                    email.innerText = userProfile.email;

                    var gender = document.getElementById('myProfileGender');
                    gender.innerText = userProfile.gender;

                    var birthday = document.getElementById('myProfileBirthday');
                    birthday.innerText = userProfile.birthday;

                    var notifications = document.getElementById('myProfileNotifications');
                    if (userProfile.notifications) {
                        notifications.innerText = 'You are subscribed to receive information about promotions and new products!';
                        document.getElementById('subscribeButton').innerHTML = 'Unsubscribe';
                    } else {
                        notifications.innerText = 'You are not subscribed to receive information about promotions and new products!';
                        document.getElementById('subscribeButton').innerHTML = 'Subscribe';
                    }
                } else {
                    if (this.status === 401){
                        window.location.replace('http://localhost/ittech?page=error401');
                    }else {
                        window.location.replace('http://localhost/ittech?page=error500');
                    }
                }
            }
        };
        getUserProfile.open("GET", "http://localhost/ittech/controller/userProfileController.php?getUserProfile");
        getUserProfile.send();
    }
}

function editNotifications() {
    var notifications = document.getElementById('myProfileNotifications');
    var editNotifications = new XMLHttpRequest();
    editNotifications.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                if (this.responseText) {
                    notifications.innerText = 'You are subscribed to receive information about promotions and new products!';
                    document.getElementById('subscribeButton').innerHTML = 'Unsubscribe';
                } else {
                    notifications.innerText = 'You are not subscribed to receive information about promotions and new products!';
                    document.getElementById('subscribeButton').innerHTML = 'Subscribe';
                }
            } else {
                if (this.status === 401){
                    window.location.replace('http://localhost/ittech?page=error401');
                }else {
                    window.location.replace('http://localhost/ittech?page=error500');
                }
            }
        }
    };
    editNotifications.open("GET", "http://localhost/ittech/controller/userProfileController.php?editNotifications");
    editNotifications.send();
}

function editFamilyName() {
    var familyNameDiv = document.getElementById('myProfileFamilyName');
    var button = document.getElementById('editFamilyName');

    if (document.getElementById('inputFamilyName')) {
        var input = document.getElementById('inputFamilyName');

        if (input.value.length !== 0) {
            var editFamilyName = new XMLHttpRequest();
            editFamilyName.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        familyNameDiv.innerText = capitalizeFirstLetter(this.responseText);
                        button.innerText = 'Edit';
                    } else {
                        if (this.status === 401){
                            window.location.replace('http://localhost/ittech?page=error401');
                        }else if(this.status === 400){
                            window.location.replace('http://localhost/ittech?page=error400');
                        } else {
                            window.location.replace('http://localhost/ittech?page=error500');
                        }
                    }
                }
            };
            editFamilyName.open("GET", "http://localhost/ittech/controller/userProfileController.php?editFamilyName=" + input.value);
            editFamilyName.send();
        } else {
            familyNameDiv.innerText = 'The field is required';
            familyNameDiv.style.color = 'red';
            button.innerText = 'Edit';
        }


    } else {
        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'inputFamilyName';
        input.autofocus = true;
        input.placeholder = 'Enter new family name';
        input.onkeydown = function () {
            clickEditFamily();
        };
        familyNameDiv.innerHTML = '';
        familyNameDiv.appendChild(input);

        button.innerText = 'Save';
    }
}


function editPassword() {
    var passwordDiv = document.getElementById('myProfilePassword');
    var button = document.getElementById('editPassword');

    if (document.getElementById('inputPassword')) {
        var inputCurrentPass = document.getElementById('inputPassword');

        if (inputCurrentPass.value.length > 0) {
            var checkPassword = new XMLHttpRequest();
            checkPassword.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        if (this.responseText) {
                            var inputNewPass = document.createElement('input');
                            inputNewPass.type = 'password';
                            inputNewPass.id = 'inputNewPassword';
                            inputNewPass.autofocus = true;
                            inputNewPass.placeholder = 'Enter new password';
                            inputNewPass.onkeydown = function () {
                                clickEditPassword();
                            };
                            passwordDiv.innerHTML = '';
                            passwordDiv.appendChild(inputNewPass);
                            button.innerText = 'Save';
                        } else {
                            passwordDiv.innerText = 'Wrong password';
                            passwordDiv.style.color = 'red';
                            button.innerText = 'Edit';

                        }
                    }else {
                        if (this.status === 401){
                            window.location.replace('http://localhost/ittech?page=error401');
                        }else {
                            window.location.replace('http://localhost/ittech?page=error500');
                        }
                    }
                }
            }
            ;
            checkPassword.open("POST", "http://localhost/ittech/controller/userProfileController.php");
            checkPassword.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            checkPassword.send("checkPassword=" + inputCurrentPass.value);
        }
    } else {
        if (document.getElementById('inputNewPassword')) {
            var inputNewPass = document.getElementById('inputNewPassword');
            if (inputNewPass.value.length > 0) {
                var editPassword = new XMLHttpRequest();
                editPassword.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            passwordDiv.innerText = 'Successfully changed password';
                            passwordDiv.style.color = 'green';
                            button.innerText = 'Edit';
                        }else {
                            if (this.status === 401){
                                window.location.replace('http://localhost/ittech?page=error401');
                            }else if(this.status === 400){
                                window.location.replace('http://localhost/ittech?page=error400');
                            } else {
                                window.location.replace('http://localhost/ittech?page=error500');
                            }
                        }
                    }
                };
                editPassword.open("POST", "http://localhost/ittech/controller/userProfileController.php");
                editPassword.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                editPassword.send("editPassword=" + inputNewPass.value);
            }
        } else {
            var inputCurrentPass = document.createElement('input');
            inputCurrentPass.type = 'password';
            inputCurrentPass.id = 'inputPassword';
            inputCurrentPass.autofocus = true;
            inputCurrentPass.placeholder = 'Enter current password';
            inputCurrentPass.onkeydown = function () {
                clickEditPassword();
            };
            passwordDiv.innerHTML = '';
            passwordDiv.appendChild(inputCurrentPass);
            button.innerText = 'Check';
        }

    }
}

function clickEditFamily() {
    if (event.keyCode === 13 || event.which === 13) {
        document.getElementById('editFamilyName').click();
    }
}

function clickEditPassword() {
    if (event.keyCode === 13 || event.which === 13) {
        document.getElementById('editPassword').click();
    }
}