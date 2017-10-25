function showMyProfile() {
    alert(1);
    // var userCart = document.getElementById('userCart');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
                // var userProfile = JSON.parse(this.responseText);
                // alert(userProfile);
            }

    };
    request.open("GET", "http://localhost/ittech/controller/userProfileController.php?getUserInfo");
    request.send();
}
