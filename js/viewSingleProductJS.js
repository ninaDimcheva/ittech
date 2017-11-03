function viewSingleProduct() {
    if (self.location == 'http://localhost/ittech/?page=viewSingleProduct') {
        var viewSingleProduct = document.getElementById('viewSingleProduct');
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    // viewProduct = Object Product;
                    var viewProduct = JSON.parse(this.responseText);

                    // ---------------------------------
                    // creates link back to main.html;

                    var linkMainPage = document.createElement('div');
                    linkMainPage.id = 'linkMainPage';
                    var a = document.createElement('a');
                    a.href = '?page=main';
                    a.innerHTML = '<- ' + 'Home page';
                    var br = document.createElement('br');
                    linkMainPage.appendChild(a);
                    viewSingleProduct.appendChild(linkMainPage);
                    viewSingleProduct.appendChild(br);
                    // ---------------------------------

                    // ---------------------------------
                    // creates basic product description;

                    var productHeading = document.createElement('div');
                    productHeading.id = 'productHeading';
                    var type = document.createElement('h4');
                    type.innerText = viewProduct.type + ' ' + viewProduct.brand + ' ' + viewProduct.model;
                    productHeading.appendChild(type);
                    var productId = document.createElement('h5');
                    productId.innerText = 'Art.№' + viewProduct.product_id;
                    productHeading.appendChild(productId);
                    viewSingleProduct.appendChild(productHeading);
                    // ---------------------------------

                    // ---------------------------------
                    // creates 3 divs for the images of the product;

                    var mainImage = document.createElement('div');
                    mainImage.id = 'mainImage';
                    var image = document.createElement('img');
                    image.src = "http://localhost/ittech/" + viewProduct.imgs[0].img_url;
                    image.style.width = '200px';
                    image.style.height = 'auto';
                    mainImage.appendChild(image);
                    viewSingleProduct.appendChild(mainImage);

                    // ---------------------------------

                    var specifications = document.createElement('div');
                    specifications.id = 'specifications';
                    var list = document.createElement('ul');
                    for (var i = 0; i < viewProduct.specifications.length; i++) {
                        var li = document.createElement('li');
                        li.innerHTML = viewProduct.specifications[i].name + ': ' + viewProduct.specifications[i].value;
                        list.appendChild(li);
                    }
                    li.innerHTML = 'On stock: ' + viewProduct.quontity + ' psc;';
                    list.appendChild(li);
                    specifications.appendChild(list);
                    viewSingleProduct.appendChild(specifications);

                    // ---------------------------------

                    for (var i = 1; i <= 2; i++) {
                        var smallImage = document.createElement('div');
                        smallImage.className = 'smallImages';
                        var images = document.createElement('img');
                        images.src = "http://localhost/ittech/" + viewProduct.imgs[i].img_url;
                        images.style.width = '50px';
                        images.style.height = 'auto';
                        smallImage.appendChild(images);
                        viewSingleProduct.appendChild(smallImage);
                    }

                    //------- rating -----

                    var ratingStarsDiv = document.getElementById('ratingStarsDiv');

                    if (viewProduct.rating) {
                        for (var k = 1; k < 6; k++) {
                            if (k <= viewProduct.rating) {
                                var redStar = document.createElement('i');
                                redStar.className = 'fa fa-star fa-2x';
                                ratingStarsDiv.appendChild(redStar);
                            } else {
                                var emptyStar = document.createElement('i');
                                emptyStar.className = 'fa fa-star-o fa-2x';
                                ratingStarsDiv.appendChild(emptyStar);
                            }
                        }
                        document.getElementById('customerReviewsNum').innerText = viewProduct.customerReviewsNum;
                    } else {
                        for (var k = 1; k < 6; k++) {
                            var emptyStar = document.createElement('i');
                            emptyStar.className = 'fa fa-star-o fa-lg';
                            ratingStarsDiv.appendChild(emptyStar);
                        }
                        document.getElementById('customerReviewsNum').innerText = 0;
                    }

                    //---------- reviews --------------

                    if (viewProduct.reviews) {
                        var usersReviews = document.getElementById('usersReviews');
                        for (k in viewProduct.reviews) {

                            var userReview = document.createElement('div');
                            userReview.className = 'userReview';


                            var userName = document.createElement('h4');
                            userName.innerText = viewProduct.reviews[k].fullName + "'s review:";
                            userReview.appendChild(userName);

                            var dateDiv = document.createElement('div');
                            dateDiv.innerText = viewProduct.reviews[k].reviewDate;
                            userReview.appendChild(dateDiv);

                            var userRate = document.createElement('div');

                            for (i = 1; i < 6; i++) {
                                if (i <= viewProduct.reviews[k].rating) {
                                    var userRedStar = document.createElement('i');
                                    userRedStar.className = 'fa fa-star fa-lg';
                                    userRate.appendChild(userRedStar);
                                } else {
                                    var userEmptyStar = document.createElement('i');
                                    userEmptyStar.className = 'fa fa-star-o fa-lg';
                                    userRate.appendChild(userEmptyStar);
                                }
                            }
                            userReview.appendChild(userRate);

                            var userMessage = document.createElement('div');
                            userMessage.id = 'userMessage';
                            userMessage.innerText = viewProduct.reviews[k].review;
                            userReview.appendChild(userMessage);

                            usersReviews.appendChild(userReview);
                        }
                    }

                    //----------------------------------

                    var showAddReviewBtn = document.getElementById('showAddReviewBtn');
                    showAddReviewBtn.value = viewProduct.product_id;

                    // ---------------------------------

                    var price = document.createElement('div');
                    price.id = 'price';

                    if (viewProduct.inPromo) {
                        var imgPromo = document.createElement('img');
                        imgPromo.id = 'imgPromo';
                        imgPromo.src = "./assets/displayImages/promo.png";
                        mainImage.appendChild(imgPromo);
                        price.innerText = 'Promo prise: $' + viewProduct.price;

                    } else {
                        price.innerText = '$' + viewProduct.price;
                    }
                    viewSingleProduct.appendChild(price);

                    // ---------------------------------


                    var favoriteRequest = new XMLHttpRequest();
                    favoriteRequest.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                var response = JSON.parse(this.responseText);

                                if (response.isAdmin) {
                                    if (viewProduct.inPromo) {
                                        //show remove promo
                                        var removePromoButton = document.createElement('div');
                                        removePromoButton.className = 'button';
                                        removePromoButton.innerHTML = 'Remove promo';
                                        removePromoButton.style.width = '100px';
                                        removePromoButton.value = viewProduct;
                                        removePromoButton.onclick = function () {
                                            removePromo(this.value);
                                        };
                                        viewSingleProduct.appendChild(removePromoButton);
                                    } else {
                                        //show add to promo
                                        var addPromoButton = document.createElement('div');
                                        addPromoButton.className = 'button';
                                        addPromoButton.innerHTML = 'Add to promo';
                                        addPromoButton.style.width = '100px';
                                        addPromoButton.value = viewProduct;
                                        addPromoButton.onclick = function () {
                                            sendToPromo(this.value);
                                        };
                                        viewSingleProduct.appendChild(addPromoButton);
                                    }
                                    var editProduct = document.createElement('div');
                                    editProduct.className = 'button';
                                    editProduct.innerHTML = 'Edit product';
                                    editProduct.style.width = '100px';
                                    editProduct.value = viewProduct;
                                    editProduct.onclick = function () {
                                        sendToEditProduct(this.value);
                                    };
                                    viewSingleProduct.appendChild(editProduct);

                                    var removeProductDiv = document.createElement('div');
                                    removeProductDiv.className = 'button';
                                    removeProductDiv.style.width = '100px';
                                    removeProductDiv.innerHTML = 'Remove product';
                                    removeProductDiv.value = viewProduct;
                                    removeProductDiv.onclick = function () {
                                        sendToRemoveProduct(this.value);
                                    };
                                    viewSingleProduct.appendChild(removeProductDiv);

                                    //----- hide add preview button
                                    document.getElementById('showAddReviewBtn').style.display = 'none';
                                } else {
                                    var favourites = document.createElement('div');
                                    favourites.id = 'favourites';
                                    favourites.className = 'button';
                                    favourites.style.cursor = 'pointer';

                                    var favoritesSpan = document.createElement('span');
                                    favoritesSpan.id = 'favoritesSpan';

                                    var imageFavourites = document.createElement('img');
                                    imageFavourites.id = 'imageFavourites';
                                    imageFavourites.style.width = '16px';
                                    imageFavourites.style.height = 'auto';

                                    if (response.isLogged) {
                                        if (response.inFavorites) {
                                            favoritesSpan.innerText = 'Remove from favorites';
                                            imageFavourites.src = "http://localhost/ittech/assets/displayImages/heart.png";
                                            favourites.onclick = function () {
                                                removeFavourite(viewProduct.product_id);
                                            };
                                        } else {
                                            favoritesSpan.innerText = 'Add in favorites';
                                            favourites.style.color = 'black';
                                            imageFavourites.src = "http://localhost/ittech/assets/displayImages/emptyHeart.png";
                                            favourites.onclick = function () {
                                                addFavourite(viewProduct.product_id);
                                            };
                                        }
                                        favourites.appendChild(imageFavourites);
                                        favourites.appendChild(favoritesSpan);
                                        viewSingleProduct.appendChild(favourites);
                                    } else {
                                        //---- show add reviw redirect to login-----
                                        document.getElementById('showAddReviewBtn').onclick = function () {
                                            window.location.replace("http://localhost/ittech/?page=login");
                                        };
                                        //-- favorites redirect to login --
                                        favoritesSpan.innerText = 'Favorites';
                                        favourites.style.color = 'black';
                                        imageFavourites.src = "http://localhost/ittech/assets/displayImages/emptyHeart.png";
                                        favourites.onclick = function () {
                                            window.location.replace("http://localhost/ittech/?page=login");
                                        };
                                        favourites.appendChild(imageFavourites);
                                        favourites.appendChild(favoritesSpan);
                                        viewSingleProduct.appendChild(favourites);
                                    }

                                    var buyNow = document.createElement('div');
                                    buyNow.className = 'button';
                                    buyNow.id = 'buySingleProduct';
                                    if (viewProduct.quontity == 0) {
                                        buyNow.innerHTML = 'OUT OF STOCK';
                                        buyNow.disabled = true;
                                    }
                                    else {
                                        buyNow.innerHTML = 'BUY NOW';
                                        buyNow.onclick = function () {
                                            sendToCart(viewProduct);
                                        };
                                    }
                                    viewSingleProduct.appendChild(buyNow);

                                }
                            }else {
                                window.location.replace('http://localhost/ittech?page=error500');
                            }
                        }
                    };
                    favoriteRequest.open("GET", "http://localhost/ittech/controller/favouriteProductController.php?infavorites=" + viewProduct.product_id);
                    favoriteRequest.send();
                }else {
                    window.location.replace('http://localhost/ittech?page=error500');
                }
            }
        };
        request.open("POST", "http://localhost/ittech/controller/viewSingleProductController.php");
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send("getObject"); //goes in $_POST["object"]
    }
}

function showAddReview(productId) {
    var showAddReviewBtn = document.getElementById('showAddReviewBtn');
    showAddReviewBtn.style.display = 'none';
    var addReviewDiv = document.getElementById('addReviewDiv');
    addReviewDiv.style.display = 'block';
    var addReview = document.getElementById('addReview');
    addReview.value = productId;
}

function rate(reviewStarId) {
    var reviewStar = reviewStarId.replace('reviewStar', '');
    var addReview = document.getElementById('addReview');

    for (var i = 1; i < 6; i++) {
        if (i <= reviewStar) {
            document.getElementById('reviewStar' + i).className = 'fa fa-star fa-2x';
        } else {
            document.getElementById('reviewStar' + i).className = 'fa fa-star-o fa-2x';
        }
    }
    if (JSON.parse(addReview.value).productId){
        addReview.value = JSON.parse(addReview.value).productId;
    }
    var reviewToSend = {
        productId: addReview.value,
        rating: reviewStar
    };
    addReview.value = JSON.stringify(reviewToSend);

}

function addReview(rateAndProductId) {
    var reviewMessage = document.getElementById('reviewMessage');
    var review = JSON.parse(rateAndProductId);
    review.reviewMessage = reviewMessage.value;

    var reviewJson = JSON.stringify(review);

    var sendReview = new XMLHttpRequest();
    sendReview.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                emptyStars();
                reviewMessage.value = '';
                var showAddReviewBtn = document.getElementById('showAddReviewBtn');
                showAddReviewBtn.style.display = 'block';
                var addReviewDiv = document.getElementById('addReviewDiv');
                addReviewDiv.style.display = 'none';

                var reviewObj = JSON.parse(this.responseText);
                var newRating = reviewObj.newRating;
                var ratingStarsDiv = document.getElementById('ratingStarsDiv');
                ratingStarsDiv.innerHTML = '';
                for (var i = 1; i < 6; i++) {

                    if (i <= newRating) {
                        var redStar = document.createElement('i');
                        redStar.className = 'fa fa-star fa-2x';
                        ratingStarsDiv.appendChild(redStar);
                    } else {
                        var emptyStar = document.createElement('i');
                        emptyStar.className = 'fa fa-star-o fa-2x';
                        ratingStarsDiv.appendChild(emptyStar);
                    }
                }

                document.getElementById('customerReviewsNum').innerText = reviewObj.customerReviewsNum;

                var usersReviews = document.getElementById('usersReviews');

                var userReview = document.createElement('div');
                userReview.className = 'userReview';


                var userName = document.createElement('h4');
                userName.innerText = reviewObj.userName + "'s review:";
                userReview.appendChild(userName);

                var dateDiv = document.createElement('div');
                dateDiv.innerText = reviewObj.reviewDate;
                userReview.appendChild(dateDiv);

                var userRate = document.createElement('div');

                for (i = 1; i < 6; i++) {
                    if (i <= review.rating) {
                        var userRedStar = document.createElement('i');
                        userRedStar.className = 'fa fa-star fa-lg';
                        userRate.appendChild(userRedStar);
                    } else {
                        var userEmptyStar = document.createElement('i');
                        userEmptyStar.className = 'fa fa-star-o fa-lg';
                        userRate.appendChild(userEmptyStar);
                    }
                }
                userReview.appendChild(userRate);

                var userMessage = document.createElement('div');
                userMessage.id = 'userMessage';
                userMessage.innerText = review.reviewMessage;
                userReview.appendChild(userMessage);

                usersReviews.appendChild(userReview);
            }else {
                window.location.replace('http://localhost/ittech?page=error'+this.status);
            }
        }
    };
    sendReview.open("GET", "http://localhost/ittech/controller/reviewController.php?addReview=" + reviewJson);
    sendReview.send();
}

function emptyStars() {

    for (var i = 1; i < 6; i++) {
        document.getElementById('reviewStar' + i).className = 'fa fa-star-o fa-2x';
    }
}

