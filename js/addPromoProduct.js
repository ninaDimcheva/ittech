window.onload = function () {
    var viewPromoProduct = document.getElementById('viewPromoProduct');
    var inputPromoFields = document.getElementById('inputPromoFields');

    if (sessionStorage.promoObj){
        var promoProduct = JSON.parse(sessionStorage.promoObj);
        sessionStorage.clear();
        var imageDiv = document.createElement('div');
        imageDiv.id = 'mainImage';
        imageDiv.style.width = '250px';
        imageDiv.style.border = '1px solid black';
        imageDiv.style.textAlign = 'center';

        var image = document.createElement('img');
        image.src = "http://localhost/ITTech/" + promoProduct.imgs[0].img_url;
        image.style.width = '150px';
        image.style.height = 'auto';
        imageDiv.appendChild(image);
        viewPromoProduct.appendChild(imageDiv);

        var productAtributesDiv = document.createElement('div');
        productAtributesDiv.id = 'productAtributes';
        productAtributesDiv.style.border = '1px solid black';
        productAtributesDiv.style.width = '350px';

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
        priceDiv.id = 'price';
        priceDiv.style.border = '1px solid green';
        priceDiv.style.width = '100px';
        priceDiv.style.height = '50px';
        priceDiv.innerHTML = promoProduct.price + ' $';
        viewPromoProduct.appendChild(priceDiv);
    }else {
        viewPromoProduct = "There is no selected product";
        inputPromoFields.innerHTML = '';
        var allProductsLink = document.createElement('a');
        allProductsLink.className = 'link';
        allProductsLink.innerText = 'Select another product';
        allProductsLink.href = './';
        inputPromoFields.appendChild(allProductsLink);
    }
};

function promoValidate() {
    var startDay = document.getElementById('startDay').value;
    var startMonth = document.getElementById('startMonth').value;
    var startYear = document.getElementById('startYear').value;
    var endDay = document.getElementById('endDay').value;
    var endMonth = document.getElementById('endMonth').value;
    var endYear = document.getElementById('endYear').value;
    var discount = document.getElementById('discount').value;
    var productId = document.getElementById('productId').value;
    var productPrice = document.getElementById('price').innerHTML.replace(' $','');
    var discountWarning = document.getElementById('discountWarning');
    var startDateWarning = document.getElementById('startDateWarning');
    var endDateWarning = document.getElementById('endDateWarning');
    var promoButton = document.getElementById('promoButton');
    var error = false;

    if (startDay !== 'Day' && startMonth !== 'Month' && startYear !== 'Year'){
        var startDate = startYear + '-' + startMonth + '-' + startDay;
        startDateWarning.innerText = '✔';
    }else {
        error = true;
        startDateWarning.innerText = '✘';
    }

    if (endDay !== 'Day' && endMonth !== 'Month' && endYear !== 'Year'){
        var endDate = endYear + '-' + endMonth + '-' + endDay;
        endDateWarning.innerText = '✔';
    }else {
        error = true;
        endDateWarning.innerText = '✘';
    }
    if (!error){
        if (endDate > startDate){
            endDateWarning.innerText = '✔';
        }else {
            error = true;
            endDateWarning.innerText = 'The End date must be bigger than Start date!';
        }
    }
    if (discount > 0 && discount < 100 && discount.length > 0 && discount.length < 45 && /\d/.test(discount)){
        discountWarning.innerText = '✔';
    }else {
        error = true;
        discountWarning.innerText = '✘';
    }
    if(!error){
        discount = (productPrice*discount)/100;
        promoButton.onclick = function () {
            sendPromoProduct(productId,startDate, endDate, discount);
        };
    }else {
        promoButton.onclick = false;
    }

}

function sendPromoProduct(productId,startDate, endDate, discount) {
    var promoProduct = {
        startDate: startDate,
        endDate: endDate,
        discount: discount,
         productId: productId
    };
     var json = JSON.stringify( promoProduct );
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if(this.readyState === 4){
          if(this.status === 200){
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
          }
      }
    };
    request.open("POST","http://localhost/ittech/controller/promoProductController.php");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('addPromoProduct='+json);
}