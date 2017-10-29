function showTypePC() {
    var mainType = document.getElementById('pc');
    var typeDiv = document.getElementById('pcTypes');
    typeDiv.style.display = 'block';
    var showTypePC = new XMLHttpRequest();
    showTypePC.onreadystatechange = function () {
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
    showTypePC.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'Computer and periphery');
    showTypePC.send();
}


function hideTypePC() {
    var typeDiv = document.getElementById('pcTypes');
    typeDiv.style.display = 'none';

}