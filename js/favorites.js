function showFavorites() {
    var getFavorites = new XMLHttpRequest();
    getFavorites.onreadystatechange = function () {
        if (this.responseText){
            var favoriteProduucts = JSON.parse(this.responseText);

            showProducts(favoriteProduucts, 'favoritesArticle');
        }else {
            document.getElementById('favoritesArticle').innerHTML = 'You have no products in favorites';
        }
    };
    getFavorites.open("Post", "http://localhost/ittech/controller/favouriteProductController.php");
    getFavorites.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    getFavorites.send('getFavorites');
}

function addFavourite(productId) {
    var addFavouriteRequest = new XMLHttpRequest();
    addFavouriteRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var favoritesSpan = document.getElementById('favoritesSpan');
                favoritesSpan.innerText = 'Remove from favorites';
                favoritesSpan.style.color = 'red';

                var imageFavourites = document.getElementById('imageFavourites');
                imageFavourites.src = "http://localhost/ITTech/assets/displayImages/heart.png";

                var favourites = document.getElementById('favourites');
                favourites.onclick = function (){
                    removeFavourite(productId);
                };
            }else {
                //TODO error
            }
        }
    };
    addFavouriteRequest.open("GET", "http://localhost/ittech/controller/favouriteProductController.php?addFavourite=" + productId);
    addFavouriteRequest.send();
}

function removeFavourite(productId) {
    var removeFavouriteRequest = new XMLHttpRequest();
    removeFavouriteRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                //on success - full feart/ Remove from favorites
                var favoritesSpan = document.getElementById('favoritesSpan');
                favoritesSpan.innerText = 'Add in favorites';
                favoritesSpan.style.color = 'black';

                var imageFavourites = document.getElementById('imageFavourites');
                imageFavourites.src = "http://localhost/ITTech/assets/displayImages/emptyHeart.png";

                var favourites = document.getElementById('favourites');
                favourites.onclick = function (){
                    addFavourite(productId);
                };
            }else {
                //TODO error
            }
        }
    };
    removeFavouriteRequest.open("GET", "http://localhost/ittech/controller/favouriteProductController.php?removeFavourite=" + productId);
    removeFavouriteRequest.send();
}