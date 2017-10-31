function showTypeSmallApp() {
    var mainType = document.getElementById('smallApp');
    var typeDiv = document.getElementById('smallAppTypes');
    typeDiv.style.display = 'block';
    mainType.appendChild(typeDiv);
}


function hideTypeSmallApp() {
    var typeDiv = document.getElementById('smallAppTypes');
    typeDiv.style.display = 'none';
}