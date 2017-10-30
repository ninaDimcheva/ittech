window.onload = function () {

    if (sessionStorage.removePromoObj) {
        var removePromoProduct = JSON.parse(sessionStorage.removePromoObj);
        sessionStorage.clear();
        var viewRemovePromoProduct = document.getElementById('viewRemovePromoProduct');
        var imageDiv = document.createElement('div');


        imageDiv.id = 'mainImage';
        imageDiv.style.width = '250px';
        imageDiv.style.border = '1px solid black';
        imageDiv.style.textAlign = 'center';

        var image = document.createElement('img');
        image.src = "http://localhost/ittech/" + removePromoProduct.imgs[0].img_url;
        image.style.width = '150px';
        image.style.height = 'auto';
        imageDiv.appendChild(image);
        viewRemovePromoProduct.appendChild(imageDiv);

        var imgPromo = document.createElement('img');
        imgPromo.style.width = '80px';
        imgPromo.style.height = 'auto';
        imgPromo.style.float = 'left';
        imgPromo.src = "./assets/displayImages/promo.png";
        imageDiv.appendChild(imgPromo);

        var productAtributesDiv = document.createElement('div');
        productAtributesDiv.id = 'productAtributes';
        productAtributesDiv.style.border = '1px solid black';
        productAtributesDiv.style.width = '350px';

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
        priceDiv.id = 'price';
        // priceDiv.style.border = '1px solid green';
        priceDiv.style.width = '100px';
        priceDiv.style.height = '50px';
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
        a.href = './';
        a.innerText = 'Select product to remove';
        removePromoSubmit.appendChild(a);
    }
};

function removePromoProduct(productId) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4){
            if (this.status === 200){
                var viewRemovePromoProduct =  document.getElementById('viewRemovePromoProduct');
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
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/promoProductController.php?removePromoProduct=" + productId);
    request.send();
}


