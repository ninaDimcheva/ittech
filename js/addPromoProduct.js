function getProduct() {
    var getProduct = new XMLHttpRequest();
    getProduct.onreadystatechange = function () {
        if (this.readyState === 4){
            if (this.status === 200){
                var product = JSON.parse(this.responseText);
                //TODO show the product number, img, brand, model, price
                //TODO discuss what to get - productId or obj Product
            }
        }

    };
    getProduct.open("GET", "http://localhost/ittech/controller/addPromoProductController.php?getProduct");
    getProduct.send();
}

function promoValidate() {
    var startDay = document.getElementById('startDay').value;
    var startMonth = document.getElementById('startMonth').value;
    var startYear = document.getElementById('startYear').value;
    var endDay = document.getElementById('endDay').value;
    var endMonth = document.getElementById('endMonth').value;
    var endYear = document.getElementById('endYear').value;
    var discount = document.getElementById('discount').value;
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
    if (discount > 0 && discount.length > 0 && discount.length < 45 && /\d/.test(discount)){
        discountWarning.innerText = '✔';
    }else {
        error = true;
        discountWarning.innerText = '✘';
    }
    if(!error){
        promoButton.onclick = function () {
            //TODO add productId
            sendPromoProduct(startDate, endDate, discount);
        };
    }else {
        promoButton.onclick = false;
    }

}

function sendPromoProduct(startDate, endDate, discount) {
    var promoProduct = {
        startDate: startDate,
        endDate: endDate,
        discount: discount
        //TODO add productId;
        // productId: productId
    };
     var json = JSON.stringify( promoProduct );
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if(this.readyState === 4){
          if(this.status === 200){
              alert(this.responseText);
              document.getElementById('productInfo').innerText = 'Successfully added product in promotion';
          }
      }
    };
    request.open("POST","http://localhost/ittech/controller/addPromoProductController.php");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('promoProduct='+json);
}