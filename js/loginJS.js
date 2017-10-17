function loginValidate(){
    var loginWarning = document.getElementById('loginWarning');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200){
                var validationResult = this.responseText;
                if(validationResult){
                    loginWarning.innerText = 'Invalid e-mail or password';
                }
                else{

                    // TODO get the name of the user and ckech for admin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    var loggedUser = document.getElementById('navigationButton');
                    loggedUser.nodeValue = 'ntrh';
                    var mainDiv = document.getElementById('mainNavigation');
                        mainDiv.innerHTML = '';
                    var profil = document.createElement('a');
                    profil.appendChild(document.createTextNode(Profil));
                    profil.href = '???????????????????????';
                    document.write("<br>");
                    var orders = document.createElement('a');
                    orders.appendChild(document.createTextNode(Orders));
                    orders.href = '???????????????????????';
                    document.write("<br>");
                    var favourites = document.createElement('a');
                    favourites.appendChild(document.createTextNode(Favourites));
                    favourites.href = '???????????????????????';
                    document.write("<br>");
                    var logOut = document.createElement('a');
                    logOut.appendChild(document.createTextNode(Exit));

                    // TODO log out the user
                    mainDiv.appendChild(profil);
                    mainDiv.appendChild(orders);
                    mainDiv.appendChild(favourites);
                    mainDiv.appendChild(logOut);
                }
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/loginController.php?loginValidation");
    request.send();
}