function showTypePC() {
    var mainType = document.getElementById('pc');
    var typeDiv = document.getElementById('pcTypes');
    typeDiv.style.display = 'block';
    mainType.appendChild(typeDiv);
}


function hideTypePC() {
    var typeDiv = document.getElementById('pcTypes');
    typeDiv.style.display = 'none';

}