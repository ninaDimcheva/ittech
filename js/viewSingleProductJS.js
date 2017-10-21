function viewSingleProduct() {
    var viewSingleProduct = document.getElementById('viewSingleProduct');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // viewProduct = Object Product;
            var viewProduct = JSON.parse(this.responseText);

            // ---------------------------------
            // creates link back to main.html;

            var linkMainPage = document.createElement('div');
            linkMainPage.id = 'linkMainPage';
            var a = document.createElement('a');
            a.href = '?page=main';
            a.innerHTML = viewProduct.type;
            var br = document.createElement('br');
            linkMainPage.appendChild(a);
            viewSingleProduct.appendChild(linkMainPage);
            // ---------------------------------

            // ---------------------------------
            // creates basic product description;
            var productHeading = document.createElement('div');
            productHeading.id = 'productHeading';
            productHeading.style.border = '1px solid black';
            productHeading.style.width = '350px';
            productHeading.style.float = 'left';
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

            // TODO make a slideshow

            var mainImage = document.createElement('div');
            mainImage.id = 'mainImage';
            mainImage.style.width = '250px';
            mainImage.style.border = '1px solid black';
            mainImage.style.textAlign = 'center';
            mainImage.float = 'left';
            var image = document.createElement('img');
            image.src = "http://localhost/ITTech/" + viewProduct.imgs[0].img_url;
            image.style.width = '150px';
            image.style.height = 'auto';
            mainImage.appendChild(image);
            viewSingleProduct.appendChild(mainImage);

            // ---------------------------------

            var favourites = document.createElement('div');
            favourites.id = 'favourites';
            favourites.style.float = 'left';
            favourites.style.width = '50px';
            favourites.style.marginRight = '20px';

            // favourites.onclick = function (){
            //     sendToFavourites(viewProduct.product_id);
            // };
            var imageFavourites = document.createElement('img');
            imageFavourites.src = "http://localhost/ITTech/assets/displayImages/heart.png";
            imageFavourites.style.width = '50px';
            imageFavourites.style.height = 'auto';
            favourites.appendChild(imageFavourites);
            favourites.innerHTML = 'Favourites';
            viewSingleProduct.appendChild(favourites);

            // ---------------------------------

            var compare = document.createElement('div');
            compare.id = 'compare';
            compare.style.float = 'left';
            compare.style.width = '50px';
            var compareImage = document.createElement('img');
            imageFavourites.src = "http://localhost/ITTech/assets/displayImages/compare.png";
            compareImage.style.width = '50px';
            compareImage.style.height = 'auto';
            compare.appendChild(compareImage);
            compare.innerHTML = 'Compare';
            viewSingleProduct.appendChild(compare);

            // ---------------------------------

            var specifications = document.createElement('div');
            specifications.id = 'specifications';
            specifications.style.float = 'left';
            specifications.style.width = '250px';
            specifications.margin = '250px';
            var list = document.createElement('ul');
            for(var i = 0; i < viewProduct.specifications.length; i++){
                var li = document.createElement('li');
                li.innerHTML = viewProduct.specifications[i].name + '-' + viewProduct.specifications[i].value;
                list.appendChild(li);
            }
            li.innerHTML = 'On stock: ' + viewProduct.quontity + ' psc;';
            list.appendChild(li);
            specifications.appendChild(list);
            viewSingleProduct.appendChild(specifications);

            // ---------------------------------

            for(var i = 1; i <= 2; i++){
                var smallImage = document.createElement('div');
                smallImage.className = 'smallImages';
                smallImage.style.width = '100px';
                smallImage.style.height = 'auto';
                smallImage.style.float = 'left';
                smallImage.style.border = '1px solid red';
                var images = document.createElement('img');
                images.src = "http://localhost/ITTech/" + viewProduct.imgs[i].img_url;
                images.style.width = '50px';
                images.style.height = 'auto';
                smallImage.appendChild(images);
                viewSingleProduct.appendChild(smallImage);
            }

            // ---------------------------------

            var price = document.createElement('div');
            price.id = 'price';
            price.style.border = '1px solid green';
            price.style.width = '100px';
            price.style.height = '50px';
            price.style.float = 'right';
            price.innerHTML = viewProduct.price + ' $';
            viewSingleProduct.appendChild(price);

            // ---------------------------------

            var buyNow = document.createElement('div');
            buyNow.className = 'button';
            buyNow.style.border = '1px solid green';
            buyNow.style.width = '100px';
            buyNow.style.height = '50px';
            buyNow.style.float = 'right';
            buyNow.innerHTML = 'BUY NOW';
            viewSingleProduct.appendChild(buyNow);



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
