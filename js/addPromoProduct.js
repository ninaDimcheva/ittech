function addPromoProduct() {
    if (self.location == 'http://localhost/ittech/?page=addPromoProduct') {
        var viewPromoProduct = document.getElementById('viewPromoProduct');
        var inputPromoFields = document.getElementById('inputPromoFields');

        if (sessionStorage.promoObj) {
            var promoProduct = JSON.parse(sessionStorage.promoObj);
            var imageDiv = document.createElement('div');
            imageDiv.className = 'mainImageDiv';

            var image = document.createElement('img');
            image.src = "http://localhost/ittech/" + promoProduct.imgs[0].img_url;
            image.className = 'adminMainImg';
            imageDiv.appendChild(image);
            viewPromoProduct.appendChild(imageDiv);

            var productAtributesDiv = document.createElement('div');
            productAtributesDiv.className = 'adminAtributes';

            var productAtributes = document.createElement('h4');
            productAtributes.innerText = promoProduct.type + ' ' + promoProduct.brand + ' ' + promoProduct.model;
            productAtributesDiv.appendChild(productAtributes);

            var productId = document.createElement('h5');
            productId.id = 'productId';
            productId.value = promoProduct.product_id;
            productId.innerText = 'Art.№' + promoProduct.product_id;
            productAtributesDiv.appendChild(productId);
            viewPromoProduct.appendChild(productAtributesDiv);

            var priceDiv = document.createElement('div');
            priceDiv.id = 'addPromoPrice';
            priceDiv.className = 'adminPriceDiv';
            priceDiv.innerHTML = 'Price $' + promoProduct.price;
            viewPromoProduct.appendChild(priceDiv);
        } else {
            viewPromoProduct.innerHTML = "There is no selected product";
            inputPromoFields.innerHTML = '';
            var allProductsLink = document.createElement('a');
            allProductsLink.className = 'link';
            allProductsLink.innerText = 'Select another product';
            allProductsLink.href = './';
            inputPromoFields.appendChild(allProductsLink);
        }
    }
}

function promoValidate() {

    var startDay = document.getElementById('startDay').value;
    var startMonth = document.getElementById('startMonth').value;
    var startYear = document.getElementById('startYear').value;
    var endDay = document.getElementById('endDay').value;
    var endMonth = document.getElementById('endMonth').value;
    var endYear = document.getElementById('endYear').value;
    var discount = document.getElementById('discount').value;
    var productId = document.getElementById('productId').value;
    var productPrice = document.getElementById('addPromoPrice').innerHTML.replace('Price $', '');
    var discountWarning = document.getElementById('discountWarning');
    var startDateWarning = document.getElementById('startDateWarning');
    var endDateWarning = document.getElementById('endDateWarning');
    var promoButton = document.getElementById('promoButton');
    var error = false;
    if (startDay !== 'Day' && startMonth !== 'Month' && startYear !== 'Year') {
        var startDate = startYear + '-' + startMonth + '-' + startDay;
        startDateWarning.innerText = '✔';
        startDateWarning.style.color = 'green';
    } else {
        error = true;
        startDateWarning.innerText = '✘';
        startDateWarning.style.color = 'red';
    }

    if (endDay !== 'Day' && endMonth !== 'Month' && endYear !== 'Year') {
        var endDate = endYear + '-' + endMonth + '-' + endDay;
        endDateWarning.innerText = '✔';
        endDateWarning.style.color = 'green';
    } else {
        error = true;
        endDateWarning.innerText = '✘';
        endDateWarning.style.color = 'red';
    }
    if (!error) {
        if (endDate > startDate) {
            endDateWarning.innerText = '✔';
            endDateWarning.style.color = 'green';
        } else {
            error = true;
            endDateWarning.innerText = 'The End date must be bigger than Start date!';
            endDateWarning.style.color = 'red';
        }
    }
    if (discount > 0 && discount < 100 && discount.length > 0 && discount.length < 45 && /\d/.test(discount)) {
        discountWarning.innerText = '✔';
        discountWarning.style.color = 'green';
    } else {
        error = true;
        discountWarning.innerText = '✘';
        discountWarning.style.color = 'red';
    }
    if (!error) {
        discount = (productPrice * discount) / 100;
        promoButton.onclick = function () {
            sendPromoProduct(productId, startDate, endDate, discount);
        };
    } else {
        promoButton.onclick = false;
    }

}

function sendPromoProduct(productId, startDate, endDate, discount) {
    document.getElementById('viewPromoProduct').innerText = "Adding product in promotion and sending e-mails to subscribed users!";
    document.getElementById('inputPromoFields').innerText = "Just wait a few moments...";
    sessionStorage.clear();
    var promoProduct = {
        startDate: startDate,
        endDate: endDate,
        discount: discount,
        productId: productId
    };
    var json = JSON.stringify(promoProduct);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var viewPromoProduct = document.getElementById('viewPromoProduct');
                viewPromoProduct.innerText = 'Successfully added product in promotion';
                var br = document.createElement('br');
                viewPromoProduct.appendChild(br);
                var productsOnPromotionLink = document.createElement('a');
                productsOnPromotionLink.className = 'link';
                productsOnPromotionLink.innerText = 'View products on promotion';
                productsOnPromotionLink.href = './?page=productsOnPromotions';
                viewPromoProduct.appendChild(productsOnPromotionLink);
                var inputPromoFields = document.getElementById('inputPromoFields');
                inputPromoFields.innerHTML = '';
                var allProductsLink = document.createElement('a');
                allProductsLink.className = 'link';
                allProductsLink.innerText = 'Select another product';
                allProductsLink.href = './';
                inputPromoFields.appendChild(allProductsLink);
            }else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    request.open("POST", "http://localhost/ittech/controller/promoProductController.php");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('addPromoProduct=' + json);
}