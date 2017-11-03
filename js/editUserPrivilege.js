function findUser() {
    var email = document.getElementById('inputUserEmail').value;
    var atSign = email.indexOf("@");
    var dot = email.lastIndexOf(".");
    var findUserWarn = document.getElementById('findUserWarn');
    var userToEdit = document.getElementById('userToEdit');
    var editUserPrivilegeForm = document.getElementById('editUserPrivilegeForm');
    var hiddenEmail = document.getElementById('hiddenEmail');
    var hiddenIsAdmin = document.getElementById('hiddenIsAdmin');

    if (email.length > 0 && email.length < 45 && atSign > 1 && (dot - atSign) > 2 && dot < (email.length - 2)) {
        findUserWarn.innerHTML = '';
        userToEdit.innerHTML = '';
        if (document.getElementById('submitUserPrivilege')) {
            editUserPrivilegeForm.removeChild(document.getElementById('submitUserPrivilege'));
        }
        if (email !== 'dimov@mail.bg') {
            var findUser = new XMLHttpRequest();
            findUser.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        if (this.responseText) {
                            var user = JSON.parse(this.responseText);
                            var name = user.name;
                            var family_name = user.family_name;
                            var is_admin = user.is_admin;

                            if (is_admin) {
                                var note = document.createElement('p');
                                note.innerText = 'You are about to take away the administrator privileges of user:';
                                userToEdit.appendChild(note);

                                var showNames = document.createElement('p');
                                showNames.innerText = capitalizeFirstLetter(name) + ' ' + capitalizeFirstLetter(family_name) + ' with e-mail: ' + email;
                                userToEdit.appendChild(showNames);
                                hiddenEmail.value = email;
                                hiddenIsAdmin.value = is_admin;
                                var editPrivilege = document.createElement('div');
                                editPrivilege.id = 'editPrivilege';
                                editPrivilege.innerText = 'Take away the admin privileges of user ' + capitalizeFirstLetter(name) + ' ' + capitalizeFirstLetter(family_name);
                                editPrivilege.className = 'button';
                                editPrivilege.onclick = function () {
                                    editPrivileges(email, is_admin);
                                };
                                editUserPrivilegeForm.appendChild(editPrivilege);
                                editPrivilege.focus();
                            } else {
                                var note = document.createElement('p');
                                note.innerText = 'You are about to give administrator privileges to user:';
                                userToEdit.appendChild(note);

                                var showNames = document.createElement('p');
                                showNames.innerText = capitalizeFirstLetter(name) + ' ' + capitalizeFirstLetter(family_name) + ' with e-mail: ' + email;
                                userToEdit.appendChild(showNames);
                                hiddenEmail.value = email;
                                hiddenIsAdmin.value = is_admin;

                                var editPrivilege = document.createElement('div');
                                editPrivilege.id = 'submitUserPrivilege';
                                editPrivilege.innerText = 'Make ' + capitalizeFirstLetter(name) + ' ' + capitalizeFirstLetter(family_name) + ' administrator';
                                editPrivilege.className = 'button';
                                editPrivilege.onclick = function () {
                                    editPrivileges(email, is_admin);
                                };
                                editUserPrivilegeForm.appendChild(editPrivilege);
                                editPrivilege.focus();
                            }
                        } else {
                            findUserWarn.innerHTML = 'There is no registered user with e-mail: ' + email;
                        }
                    } else {
                        window.location.replace('http://localhost/ittech?page=error500');
                    }
                }
            };
            findUser.open("GET", "http://localhost/ittech/controller/editUserPrivilegeController.php?findUser=" + email);
            findUser.send();
        } else {
            findUserWarn.innerHTML = "You can't change the privileges of super admin user!"
        }
    } else {
        findUserWarn.innerHTML = 'You must enter a valid e-mail address!'
    }
}

function clickFindUser() {
    if (event.keyCode === 13) {
        document.getElementById('findUserButton').click();
    }
}

function editPrivileges(email, isAdmin) {
    var sendToEdit = {
        email: email,
        isAdmin: isAdmin
    };
    var editPrivileges = new XMLHttpRequest();
    editPrivileges.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                if (this.responseText) {
                    document.getElementById('findUser').innerHTML = '';
                    document.getElementById('userToEdit').innerHTML = 'Privileges successfully changed!';
                    document.getElementById('userToEdit').style.color = 'green';
                    var success = document.getElementById('editUserPrivilegeForm');
                    success.innerHTML = '';
                    var editUserLink = document.createElement('a');
                    editUserLink.className = 'link';
                    editUserLink.innerText = 'Select another user';
                    editUserLink.href = './?page=editUserPrivilege';
                    success.appendChild(editUserLink);
                }

            } else {
                window.location.replace('http://localhost/ittech?page=error'+this.status);
            }
        }
    };
    editPrivileges.open("GET", "http://localhost/ittech/controller/editUserPrivilegeController.php?editPrivileges=" + JSON.stringify(sendToEdit));
    editPrivileges.send();
}