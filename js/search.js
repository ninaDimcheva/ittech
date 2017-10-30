function search(searched) {
    var getSearchedProducts = new XMLHttpRequest();
    getSearchedProducts.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                if (this.responseText) {
                    var searchedProducts = JSON.parse(this.responseText);
                    showProducts(searchedProducts, 'article');
                } else {
                    var article = document.getElementById('article');
                    article.innerHTML = "";
                    var noResult = document.createElement('img');
                    noResult.src = './assets/displayImages/noResult.jpg';
                    noResult.alt = 'no search result';
                    article.appendChild(noResult);
                }
            } else {
                //TODO error
            }
        }
    };
    getSearchedProducts.open("POST", "http://localhost/ittech/controller/searchController.php");
    getSearchedProducts.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getSearchedProducts.send("getSearchedProducts=" + searched);
}


function clickSearch(event) {

    var searched = document.getElementById('search');
    var datalist = document.getElementById('autocomplete');

    if (event.keyCode === 13 || event.which === 13) {
        if (self.location == 'http://localhost/ittech/' || self.location == 'http://localhost/ittech/?page=main'){
            searched.innerHTML = '';
            search(searched.value);
        }else{
            sessionStorage.search = searched.value;
            window.location.replace("http://localhost/ittech/");
        }
    } else {
        var getMatchedWords = new XMLHttpRequest();
        getMatchedWords.onreadystatechange = function () {
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
        getMatchedWords.open("GET", "http://localhost/ittech/controller/searchController.php?getMatchedWords=" + searched.value);
        getMatchedWords.send();
    }
}