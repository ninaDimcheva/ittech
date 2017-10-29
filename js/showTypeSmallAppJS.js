function showTypeSmallApp() {
    var mainType = document.getElementById('smallApp');
    var typeDiv = document.getElementById('smallAppTypes');
    typeDiv.style.display = 'block';
    var showTypeSmallElectric = new XMLHttpRequest();
    showTypeSmallElectric.onreadystatechange = function () {
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
    showTypeSmallElectric.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'Small appliances');
    showTypeSmallElectric.send();
}


function hideTypeSmallApp() {
    var typeDiv = document.getElementById('smallAppTypes');
    typeDiv.style.display = 'none';

}