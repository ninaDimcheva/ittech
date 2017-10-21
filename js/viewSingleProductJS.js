function viewSingleProduct() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var productObject = JSON.parse(this.responseText); // this is the object
            alert(productObject);
            // ---------------------------------
            // creates link back to main.html;
            var linkBack = document.createElement('div');
            link.id = 'linkBack';
            a = document.createElement('a');
            a.href = '?page=main';
            a.innerHTML = productObject.type;
            var br = document.createElement('br');
            linkBack.appendChild(a);
            linkBack.appendChild(br);
            document.body.appendChild(linkBack);
            // ---------------------------------

            // ---------------------------------
            // creates basic product description;
            var infoProduct = document.createElement('div');
            infoProduct.id = 'infoProduct';
            var type = document.createElement('h2');
            type.innerText = productObject.type + ' ' + productObject.brand + ' ' + productObject.model;
            infoProduct.appendChild(type);
            infoProduct.appendChild(br);
            var productNumber = document.createElement('h3');
            productNumber.innerText = productObject.product_id;
            infoProduct.appendChild(productNumber);
            infoProduct.appendChild(br);
            document.body.appendChild(infoProduct);
            // ---------------------------------

            // ---------------------------------
            // creates 3 divs for the images of the product;

            // TODO make a slideshow

            var mainImage = document.createElement('div');
            mainImage.id = 'mainImage';
            var image = document.createElement('img');
            img.src = "http://localhost/ITTech/" + productsObject.img_urls[0].img_url;
            mainImage.appendChild(img);
            document.body.appendChild(mainImage);
            for(var i = 1; i <= 2; i++){
                var smallImage = document.createElement('div');
                smallImage.className = 'smallImages';
                image.src = "http://localhost/ITTech/" + productsObject.img_urls[i].img_url;
                smallImage.appendChild(image);
                document.body.appendChild(smallImage);
            }
            // ---------------------------------

            var favourites = document.createElement('div');
            favourites.id = 'favourites';
            favourites.onclick = function (){
                sendToFavourites(productObject.product_id);
            };
            var imageFavourites = document.createElement('img');
            imageFavourites.src = '../assets/displayImages/heart.png';
            favourites.appendChild(imageFavourites);
            favourites.innerHTML = 'Favourites';
            document.body.appendChild(smallImage);

            var compare = document.createElement('div');
            compare.id = 'compare';


        }
    };

    //  TODO post  vs get ???????????
    request.open("POST", "http://localhost/ittech/controller/viewSingleProductController.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("getObject"); //goes in $_POST["object"]
}

function sendToFavourites(product_id) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // TODO change the favoutites button value;
        }
    };

    request.open("POST", "http://localhost/ittech/controller/addFavouriteProductController.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("product_id=" + JSON.stringify(product_id)); //goes in $_POST["object"]
}
