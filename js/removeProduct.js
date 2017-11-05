function viewRemoveProduct() {
    if (self.location == 'http://localhost/ittech/?page=removeProduct') {
        var viewRemoveProduct = document.getElementById('viewRemoveProduct');
        if (sessionStorage.removeProductObj) {
            var removeProduct = JSON.parse(sessionStorage.removeProductObj);
            var imageDiv = document.createElement('div');
            imageDiv.className = 'mainImageDiv displayInlineBlock';

            var image = document.createElement('img');
            image.src = "http://localhost/ittech/" + removeProduct.imgs[0].img_url;
            image.className = 'adminMainImg';
            imageDiv.appendChild(image);
            viewRemoveProduct.appendChild(imageDiv);

            var productAtributesDiv = document.createElement('div');
            productAtributesDiv.className = 'adminAtributes';

            var productAtributes = document.createElement('h4');
            productAtributes.innerText = removeProduct.type + ' ' + removeProduct.brand + ' ' + removeProduct.model;
            productAtributesDiv.appendChild(productAtributes);

            var productId = document.createElement('h5');
            productId.id = 'productId';
            productId.value = removeProduct.product_id;
            productId.innerText = 'Art.№' + removeProduct.product_id;
            productAtributesDiv.appendChild(productId);
            viewRemoveProduct.appendChild(productAtributesDiv);

            var priceDiv = document.createElement('div');
            priceDiv.className = 'adminPriceDiv';

            if (removeProduct.inPromo) {
                var imgPromo = document.createElement('img');
                imgPromo.className = 'adminPromoImg';
                imgPromo.src = "./assets/displayImages/promo.png";
                imageDiv.appendChild(imgPromo);
                priceDiv.style.color = 'red';
                priceDiv.innerText = 'Promo prise: $' + removeProduct.price;

            } else {
                priceDiv.innerText = 'Price $' + removeProduct.price;
            }
            viewRemoveProduct.appendChild(priceDiv);

            var removeProductButton = document.getElementById('removeProductButton');
            removeProductButton.value = removeProduct.product_id;

        }else {
            var removeProductSubmit = document.getElementById('removeProductSubmit');
            removeProductSubmit.innerHTML = '';
            viewRemoveProduct.innerHTML = 'There is no selected product';
            var allProductsLink = document.createElement('a');
            allProductsLink.className = 'link';
            allProductsLink.innerText = 'Select another product';
            allProductsLink.href = './';
            removeProductSubmit.appendChild(allProductsLink);
        }
    }
}

function removeProduct(productId) {
    sessionStorage.clear();
    var removeProduct = new XMLHttpRequest();
    removeProduct.onreadystatechange = function () {
        if (this.readyState === 4){
            if (this.status === 200){
                var viewRemoveProduct =  document.getElementById('viewRemoveProduct');
                viewRemoveProduct.innerHTML = 'Successfully remove the product';
                var br = document.createElement('br');
                viewRemoveProduct.appendChild(br);

                var removeProductSubmit = document.getElementById('removeProductSubmit');
                removeProductSubmit.innerHTML = '';
                var main = document.createElement('a');
                main.className = 'link';
                main.innerText = 'View all products';
                main.href = './';
                removeProductSubmit.appendChild(main);
            }else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    removeProduct.open("GET", "http://localhost/ittech/controller/removeProductController.php?removeProduct=" + productId);
    removeProduct.send();
}