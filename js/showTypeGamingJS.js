function showTypeGaming() {
    var mainType = document.getElementById('gaming');
    var typeDiv = document.getElementById('gamingTypes');
    typeDiv.style.display = 'block';
    var showTypeGaming = new XMLHttpRequest();
    showTypeGaming.onreadystatechange = function () {
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
    showTypeGaming.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'Computer and periphery');
    showTypeGaming.send();
}


function hideTypeGaming() {
    var typeDiv = document.getElementById('gamingTypes');
    typeDiv.style.display = 'none';

}