function showTypeTV() {
        var mainType = document.getElementById('tv');
        var typeDiv = document.getElementById('tvTypes');
        typeDiv.style.display = 'block';
        mainType.appendChild(typeDiv);
}

function hideTypeTV() {
    var typeDiv = document.getElementById('tvTypes');
    typeDiv.style.display = 'none';
}


// function showProductsByType(type){
//     sessionStorage.selectedType = type;
//     window.location.replace("http://localhost/ittech/?page=productsByType");
// }

