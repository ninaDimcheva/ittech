function removePromotion() {
    if (self.location == 'http://localhost/ittech/?page=removePromoProduct') {
        if (sessionStorage.removePromoObj) {
            var removePromoProduct = JSON.parse(sessionStorage.removePromoObj);
            var viewRemovePromoProduct = document.getElementById('viewRemovePromoProduct');
            var imageDiv = document.createElement('div');
            imageDiv.className = 'mainImageDiv displayInlineBlock';

            var image = document.createElement('img');
            image.src = "http://localhost/ittech/" + removePromoProduct.imgs[0].img_url;
            image.className = 'adminMainImg';

            imageDiv.appendChild(image);
            viewRemovePromoProduct.appendChild(imageDiv);

            var imgPromo = document.createElement('img');
            imgPromo.className = 'adminPromoImg';
            imgPromo.src = "./assets/displayImages/promo.png";
            imageDiv.appendChild(imgPromo);

            var productAtributesDiv = document.createElement('div');
            productAtributesDiv.className = 'adminAtributes';

            var productAtributes = document.createElement('h4');
            productAtributes.innerText = removePromoProduct.type + ' ' + removePromoProduct.brand + ' ' + removePromoProduct.model;
            productAtributesDiv.appendChild(productAtributes);

            var productId = document.createElement('h5');
            productId.id = 'productId';
            productId.value = removePromoProduct.product_id;
            productId.innerText = 'Art.№' + removePromoProduct.product_id;
            productAtributesDiv.appendChild(productId);
            viewRemovePromoProduct.appendChild(productAtributesDiv);

            var priceDiv = document.createElement('div');
            priceDiv.className = 'adminPriceDiv';
            priceDiv.style.color = 'red';
            priceDiv.innerText = 'Promo prise: $' + removePromoProduct.price;
            viewRemovePromoProduct.appendChild(priceDiv);

            var removePromoButton = document.getElementById('removePromoButton');
            removePromoButton.value = removePromoProduct.product_id;

        } else {
            var removePromoSubmit = document.getElementById('removePromoSubmit');
            removePromoSubmit.innerHTML = '';
            var a = document.createElement('a');
            a.className = 'link';
            a.href = './?page=productsOnPromotions';
            a.innerText = 'Select another product';
            removePromoSubmit.appendChild(a);
        }
    }
}

function removePromoProduct(productId) {
    sessionStorage.clear();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var viewRemovePromoProduct = document.getElementById('viewRemovePromoProduct');
                viewRemovePromoProduct.innerHTML = 'Successfully remove the promotion';
                var br = document.createElement('br');
                viewRemovePromoProduct.appendChild(br);
                productsOnPromotionLink = document.createElement('a');
                productsOnPromotionLink.className = 'link';
                productsOnPromotionLink.innerText = 'View products on promotion';
                productsOnPromotionLink.href = './?page=productsOnPromotions';
                viewRemovePromoProduct.appendChild(productsOnPromotionLink);
                var removePromoSubmit = document.getElementById('removePromoSubmit');
                removePromoSubmit.innerHTML = '';
                var allProductsLink = document.createElement('a');
                allProductsLink.className = 'link';
                allProductsLink.innerText = 'View all products';
                allProductsLink.href = './';
                removePromoSubmit.appendChild(allProductsLink);
            } else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/promoProductController.php?removePromoProduct=" + productId);
    request.send();
}


