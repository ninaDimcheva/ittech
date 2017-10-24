function clickSearch(event) {
    var searched = document.getElementById('search');
    var datalist = document.getElementById('autocomplete');

    if (event.keyCode === 13 || event.which === 13) {
        sessionStorage.search = searched.value;
        window.location.replace("http://localhost/ITTech");
    } else {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var matchedWords = JSON.parse(this.responseText);
                    datalist.innerHTML = '';
                    for (var i in matchedWords) {
                        var option = document.createElement('option');
                        option.value = matchedWords[i];
                        datalist.appendChild(option);
                    }
                }
            }
        };
        request.open("GET", "http://localhost/ittech/controller/searchController.php?getMatchedWords=" + searched.value)
        request.send();
    }
}
