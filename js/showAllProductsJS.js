function showAllProducts(orderBy, type) {
    if (self.location == 'http://localhost/ittech/' || self.location == 'http://localhost/ittech/?page=main') {
        orderBy = orderBy || null;
        type = type || null;

        if (sessionStorage.search) {
            search(sessionStorage.search);
            sessionStorage.clear();
        } else if (type == null) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var productsObject = JSON.parse(this.responseText);
                    showProducts(productsObject, 'article');
                }
            };
            request.open("POST", "http://localhost/ittech/controller/mainController.php");
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send("getAllProducts=" + orderBy);
        }
        else {
            var productsForType = new XMLHttpRequest();
            productsForType.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var productsObject = JSON.parse(this.responseText);
                    showProducts(productsObject, 'article');
                }
            };
            productsForType.open("POST", "http://localhost/ittech/controller/mainController.php");
            productsForType.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            productsForType.send("getAllProductsForType=" + type);
        }
    }
}
/**
 *
 * @param product = Object product
 */
function sendProductObject(product) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // TODO check if it is ok with can manage only with status code, you don't return echo from the main controller -> make sure it is ok!!!!!!;
            window.location.replace("http://localhost/ittech/?page=viewSingleProduct");
        }
    };
    request.open("POST", "http://localhost/ittech/controller/mainController.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("object=" + JSON.stringify(product)); //goes in $_POST["object"]
}


/**
 *
 * @param product = Object product
 */
function sendToCart(product) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // TODO check if it is ok with can manage only with status code, you don't return echo from the main controller -> make sure it is ok!!!!!!;
            window.location.replace("http://localhost/ittech/?page=userCart");
        }
    };
    request.open("POST", "http://localhost/ittech/controller/sendToCartController.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("singleProductToBuy=" + JSON.stringify(product)); //goes in $_POST["object"]
}

function sendToPromo(promoProduct) {
    sessionStorage.promoObj = JSON.stringify(promoProduct);
    window.location.replace("http://localhost/ittech/?page=addPromoProduct");
}

function removePromo(promoProduct) {
    sessionStorage.removePromoObj = JSON.stringify(promoProduct);
    window.location.replace("http://localhost/ittech/?page=removePromoProduct");
}

function sendToEditProduct(product) {
    sessionStorage.editProductObj = JSON.stringify(product);
    window.location.replace("http://localhost/ittech/?page=editProduct");
}

function showProducts(productsObject, id) {
    var productNumber;
    var currentProduct = 0;
    var article = document.getElementById(id);
    //the last element of the array is isAdmin value
    var productsCount = productsObject.length - 1;
    var isAdmin = productsObject[productsCount];
    article.innerHTML = '';
    for (var i = 0; i < productsCount; i += 4) {
        if (i % 4 === 0) {

            // ---------------------------------
            // creates the main content container which will show 4 products;

            var contentContainer = document.createElement('div');
            contentContainer.id = "contentContainer" + ((i / 4) + 1);
            contentContainer.className = 'contentContainer';
            article.appendChild(contentContainer);

        }
        // ---------------------------------


        if ((productsCount - i) > 4) {
            productNumber = 4;
        }
        else {
            productNumber = productsCount - i;
        }

        // ---------------------------------
        // creates the single panel, which will show information only for one product;
        for (var j = 1; j <= productNumber; j++) {
            var panel = document.createElement('div');
            panel.className = 'productPanel';
            document.getElementById(contentContainer.id).appendChild(panel);

            var imageDiv = document.createElement('div');
            imageDiv.className = 'imageDiv';
            panel.appendChild(imageDiv);

            var img = document.createElement('img');
            img.src = "http://localhost/ittech/" + productsObject[currentProduct].imgs[0].img_url;
            img.className = 'frontImg';
            img.value = productsObject[currentProduct];
            img.onclick = function () {
                sendProductObject(this.value);
            };
            imageDiv.appendChild(img);

            var infoProduct = document.createElement('div');
            infoProduct.className = 'infoProduct';
            panel.appendChild(infoProduct);

            var brand = document.createElement('h4');
            brand.innerText = productsObject[currentProduct].brand;
            infoProduct.appendChild(brand);

            var model = document.createElement('h6');
            model.innerText = productsObject[currentProduct].model;
            infoProduct.appendChild(model);

            //---------rating-------
            var rating = productsObject[currentProduct].rating;
            var ratingDiv = document.createElement('div');

            if (rating){
                for (var k = 1; k < 6; k++) {
                    if (k <= rating) {
                        var redStar = document.createElement('i');
                        redStar.className = 'fa fa-star fa-lg';
                        ratingDiv.appendChild(redStar);
                    } else {
                        var emptyStar = document.createElement('i');
                        emptyStar.className = 'fa fa-star-o fa-lg';
                        ratingDiv.appendChild(emptyStar);
                    }
                }
                panel.appendChild(ratingDiv);
            }else {
                for (var k = 1; k < 6; k++) {
                        var emptyStar = document.createElement('i');
                        emptyStar.className = 'fa fa-star-o fa-lg';
                    ratingDiv.appendChild(emptyStar);
                }
                panel.appendChild(ratingDiv);
            }

            var price = document.createElement('h2');

            if (productsObject[currentProduct].inPromo) {
                productsObject[currentProduct].price -= productsObject[currentProduct].inPromo;
                productsObject[currentProduct].price = productsObject[currentProduct].price.toFixed(2);

                var imgPromo = document.createElement('img');
                imgPromo.className = 'imgPromo';
                imgPromo.src = "./assets/displayImages/promo.png";
                imageDiv.appendChild(imgPromo);

                price.innerText = 'Promo prise: $' + productsObject[currentProduct].price;

            } else {
                price.innerText = '$' + productsObject[currentProduct].price;
            }

            price.style.color = 'red';
            infoProduct.appendChild(price);
            // TODO test the buy button
            if (isAdmin) {
                if (productsObject[currentProduct].inPromo) {
                    var removePromoButton = document.createElement('div');
                    removePromoButton.className = 'button';
                    removePromoButton.innerHTML = 'Remove promo';
                    removePromoButton.value = productsObject[currentProduct];
                    removePromoButton.onclick = function () {
                        removePromo(this.value);
                    };
                    panel.appendChild(removePromoButton);
                } else {
                    var addPromoButton = document.createElement('div');
                    addPromoButton.className = 'button';
                    addPromoButton.innerHTML = 'Add to promo';
                    addPromoButton.value = productsObject[currentProduct];
                    addPromoButton.onclick = function () {
                        sendToPromo(this.value);
                    };
                    panel.appendChild(addPromoButton);
                }

                var editProduct = document.createElement('div');
                editProduct.className = 'button';
                editProduct.innerHTML = 'Edit product';
                editProduct.value = productsObject[currentProduct];
                editProduct.onclick = function () {
                    sendToEditProduct(this.value);
                };
                panel.appendChild(editProduct);
            } else {
                var buyButton = document.createElement('div');
                buyButton.className = 'button prevBuyButton';
                if (productsObject[currentProduct].quontity == 0) {
                    buyButton.innerHTML = 'OUT OF STOCK';
                    buyButton.disabled = true;
                }
                else {
                    buyButton.innerHTML = 'BUY';
                    buyButton.value = productsObject[currentProduct];
                    buyButton.onclick = function () {
                        sendToCart(this.value);
                    };
                }
                panel.appendChild(buyButton);
            }
            currentProduct++;
        }


    }
}

// function mainOrderBy(orderBy) {
//     var orderBy = new XMLHttpRequest();
//     orderBy.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             var productsObject = JSON.parse(this.responseText);
//             showProducts(productsObject, 'article');
//
//         }
//     };
//     orderBy.open("POST", "http://localhost/ittech/controller/mainController.php");
//     orderBy.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     orderBy.send("orderBy");
// }