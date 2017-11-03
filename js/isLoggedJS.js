function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isLogged() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var userObject = JSON.parse(this.responseText);
                var name = userObject.name;
                var isAdmin = userObject.is_admin;
                var navigationButton = document.getElementById('loginButton');
                navigationButton.innerHTML = capitalizeFirstLetter(name);
                var image = document.createElement('img');
                image.src = "http://localhost/ittech/assets/displayImages/person.png";
                image.alt = 'Person';
                image.id = 'login';
                navigationButton.appendChild(image);
                var mainDiv = document.getElementById('mainNavigation'); // the inner div
                mainDiv.innerHTML = '';
                if (isAdmin) {
                    var adminProfil = document.createElement('a');
                    adminProfil.innerHTML = 'Admin Profile';
                    adminProfil.href = '?page=myProfile';
                    mainDiv.appendChild(adminProfil);
                    br = document.createElement('br');
                    mainDiv.appendChild(br);
                    var addNewProduct = document.createElement('a');
                    addNewProduct.innerHTML = 'Add new product';
                    addNewProduct.href = '?page=addProduct';
                    mainDiv.appendChild(addNewProduct);
                    var newLine = document.createElement('br');
                    mainDiv.appendChild(newLine);
                    var editUserPrivileges = document.createElement('a');
                    editUserPrivileges.innerHTML = 'Edit user privileges';
                    editUserPrivileges.href = '?page=editUserPrivilege';
                    mainDiv.appendChild(editUserPrivileges);
                    var logout = document.createElement('form');
                    logout.action = "controller/logoutController.php";
                    logout.method = 'post';
                    var inputFiled = document.createElement('input');
                    inputFiled.type = 'submit';
                    inputFiled.name = 'logout';
                    inputFiled.value = 'Logout';
                    inputFiled.className = 'button';
                    logout.appendChild(inputFiled);
                    mainDiv.appendChild(logout);
                } else {
                    var profile = document.createElement('a');
                    profile.innerHTML = 'My profile';
                    profile.href = '?page=myProfile';
                    var lineNew = document.createElement('br');
                    mainDiv.appendChild(profile);
                    mainDiv.appendChild(lineNew);
                    var orders = document.createElement('a');
                    orders.innerHTML = 'My orders';
                    orders.href = '?page=myOrders';
                    mainDiv.appendChild(orders);
                    var newRow = document.createElement('br');
                    mainDiv.appendChild(newRow);
                    var favourites = document.createElement('a');
                    favourites.innerHTML = 'Favourites';
                    favourites.href = '?page=myFavorites';
                    mainDiv.appendChild(favourites);
                    var form = document.createElement('form');
                    form.action = "controller/logoutController.php";
                    form.method = 'post';
                    var input = document.createElement('input');
                    input.type = 'submit';
                    input.name = 'logout';
                    input.value = 'Logout';
                    input.className = 'button';
                    form.appendChild(input);
                    mainDiv.appendChild(form);
                }
            }else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/isLoggedController.php?isLogged");
    request.send();
}


