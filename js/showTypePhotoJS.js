function showTypePhoto() {
    var mainType = document.getElementById('photo');
    var typeDiv = document.getElementById('photoTypes');
    typeDiv.style.display = 'block';
    var showTypePhoto = new XMLHttpRequest();
    showTypePhoto.onreadystatechange = function () {
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
    showTypePhoto.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'Computer and periphery');
    showTypePhoto.send();
}


function hideTypePhoto() {
    var typeDiv = document.getElementById('photoTypes');
    typeDiv.style.display = 'none';

}