function showTypePC() {
    var  = document.getElementById('');
    var  = new XMLHttpRequest();
    .onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var types = JSON.parse(this.responseText);
                alert(types);
            }
        }
    };
    .open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'TV sets and audio');
    .send();
}