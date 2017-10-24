function showTypeTV() {
    var mainType = document.getElementById('tv');
    var typeDiv = document.getElementById('tvTypes');
    typeDiv.style.visibility = 'visible';
    var showTypeTV = new XMLHttpRequest();
    showTypeTV.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var types = JSON.parse(this.responseText);
                typeDiv.innerHTML = '';
                var typeList = document.createElement("ul");
                for(var i in types){
                    var list = document.createElement('li');
                    list.innerHTML = types[i];
                    list.className = 'li';
                    var br = document.createElement('br');
                    typeList.appendChild(br);
                    typeList.appendChild(list);
                }
                typeDiv.appendChild(typeList);
                mainType.appendChild(typeDiv);
            }
        }
    };
    showTypePC.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'TV sets and audio');
    showTypePC.send();
}


function hideTypeTV(){
    var typeDiv = document.getElementById('tvTypes');
    typeDiv.style.visibility = 'hidden';

}