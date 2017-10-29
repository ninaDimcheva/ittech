function showTypePhone() {
    var mainType = document.getElementById('phones');
    var typeDiv = document.getElementById('phoneTypes');
    typeDiv.style.display = 'block';
    var showTypePhone = new XMLHttpRequest();
    showTypePhone.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var types = JSON.parse(this.responseText);
                typeDiv.innerHTML = '';
                var typeList = document.createElement("ul");
                for (var i in types) {
                    var list = document.createElement('li');
                    list.innerHTML = types[i];
                    list.className = 'types';
                    var br = document.createElement('br');
                    typeList.appendChild(br);
                    typeList.appendChild(list);
                }
                typeDiv.appendChild(typeList);
                mainType.appendChild(typeDiv);
            }
        }
    };
    showTypePhone.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'Phones and tablets');
    showTypePhone.send();
}


function hideTypePhone() {
    var typeDiv = document.getElementById('phoneTypes');
    typeDiv.style.display = 'none';

}