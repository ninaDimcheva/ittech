// TODO br don't work

function isLogged(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var checkIfLogged = this.responseText;
                if (checkIfLogged) {
                    var navigationButton = document.getElementById('loginButton');
                    navigationButton.innerHTML = checkIfLogged;
                    var mainDiv = document.getElementById('mainNavigation'); // the inner div
                    mainDiv.innerHTML = '';
                    var profil = document.createElement('a');
                    profil.innerHTML = 'Profil';
                    profil.href = '?page=myProfile';
                    var br = document.createElement('br');
                    mainDiv.appendChild(profil);
                    var orders = document.createElement('a');
                    orders.innerHTML = 'Orders';
                    orders.href = '?page=myOrders';
                    mainDiv.appendChild(br);
                    mainDiv.appendChild(orders);
                    var favourites = document.createElement('a');
                    favourites.innerHTML = 'Favourites';
                    favourites.href = '?page=myFavorites';
                    mainDiv.appendChild(br);
                    mainDiv.appendChild(favourites);
                    var form = document.createElement('form');
                    form.action = "controller/logoutController.php";
                    form.method = 'post';
                    var input = document.createElement('input');
                    input.type = 'submit';
                    input.name = 'logout';
                    input.value = 'Logout';
                    input.class = 'button';
                    form.appendChild(input);
                    mainDiv.appendChild(form);
                }
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/isLoggedController.php?islogged");
    request.send();
}
