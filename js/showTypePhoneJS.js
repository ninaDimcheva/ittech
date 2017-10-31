function showTypePhone() {
    var mainType = document.getElementById('phones');
    var typeDiv = document.getElementById('phoneTypes');
    typeDiv.style.display = 'block';
    mainType.appendChild(typeDiv);
}


function hideTypePhone() {
    var typeDiv = document.getElementById('phoneTypes');
    typeDiv.style.display = 'none';
}