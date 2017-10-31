function showTypePhoto() {
    var mainType = document.getElementById('photo');
    var typeDiv = document.getElementById('photoTypes');
    typeDiv.style.display = 'block';
    mainType.appendChild(typeDiv);
}


function hideTypePhoto() {
    var typeDiv = document.getElementById('photoTypes');
    typeDiv.style.display = 'none';
}