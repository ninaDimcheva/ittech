function showTypeSmallApp() {
    var showTypeSmallApp = new XMLHttpRequest();
    getMainTypes.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
            }
        }
    };
    getMainTypes.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes");
    getMainTypes.send();
}