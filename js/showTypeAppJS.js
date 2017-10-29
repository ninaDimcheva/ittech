function showTypeApp() {
    var mainType = document.getElementById('electric');
    var typeDiv = document.getElementById('appTypes');
    typeDiv.style.display = 'block';
    var showTypeElectric = new XMLHttpRequest();
    showTypeElectric.onreadystatechange = function () {
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
    showTypeElectric.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'Electrical appliances');
    showTypeElectric.send();
}


function hideTypeApp() {
    var typeDiv = document.getElementById('appTypes');
    typeDiv.style.display = 'none';

}