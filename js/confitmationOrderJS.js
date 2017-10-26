
// TODO information user style and think avout the redirection of the user!!!!!!!!!!!!!!!!!








// the function will check if the user is already logged in will validate the information in the order
function confirmOrder() {
    var isLoggedUser = new XMLHttpRequest();
    isLoggedUser.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var result = this.responseText;
            if(result == 'Logged'){
                window.location.replace("http://localhost/ITTech/?page=confirmOrder");
            }
            else{
                var userInformation = document.getElementById('loginConfirmation');
                userInformation.innerHTML = 'You must be logged to make an order. Please fallow the link.';
                userInformation.style.backgroundColor = 'red';
                var link = document.createElement('a');
                link.href = '?page=login';
                link.innerHTML = 'Login';
                userInformation.appendChild(link);
            }
        }
    };
    isLoggedUser.open("GET", "http://localhost/ittech/controller/isLoggedController.php?isSetUser");
    isLoggedUser.send();

}
