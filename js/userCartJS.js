function showUserCart() {
    var userCart = document.getElementById('userCart');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var cartProducts = JSON.parse(this.responseText);
            // cartProducts is a plain array with keys - numbers;
            for (var i = 0; i < cartProducts.length; i++) {
                var newRow = document.createElement('tr');

                var newColumnNumber = document.createElement('td');
                newColumnNumber.innerHTML = (i + 1);
                newRow.appendChild(newColumnNumber);

                var newColumnImage = document.createElement('td');
                var image = document.createElement('img');
                image.src = "http://localhost/ITTech/" + cartProducts[i].imgs[0].img_url;
                image.style.width = '150px';
                image.style.height = 'auto';
                newColumnImage.appendChild(image);
                newRow.appendChild(newColumnImage);

                var newColumnProduct = document.createElement('td');
                newColumnProduct.innerHTML = ' ' + cartProducts[i].brand + ' ' + cartProducts[i].type + ' ' + cartProducts[i].model;
                newRow.appendChild(newColumnProduct);

                var newColumnPrice = document.createElement('td');
                newColumnPrice.innerHTML = cartProducts[i].price;
                newColumnPrice.id = 'price';
                newRow.appendChild(newColumnPrice);

                var newColumnQuantity = document.createElement('td');
                var inputFiled = document.createElement('input');
                inputFiled.type = 'number';
                inputFiled.id = i;
                inputFiled.required = true;
                inputFiled.value = '1';
                inputFiled.min = '1';

                inputFiled.onchange = function () {
                    var productPrice = document.getElementById('price').innerHTML;
                    checkQuantity(this.value, productPrice,this.id);
                };

                newColumnQuantity.appendChild(inputFiled);
                newRow.appendChild(newColumnQuantity);

                var newColumnAmount = document.createElement('td');
                newColumnAmount.id = 'quantity' + (i);
                newColumnAmount.innerHTML = cartProducts[i].price;
                newRow.appendChild(newColumnAmount);



                // inputFiled.onkeyup = function () {
                //     checkQuantity(this.value, document.getElementById(newColumnPrice.id).innerHTML, document.getElementById('amount' + i));
                // };

                userCart.appendChild(newRow);
            }
            var row = document.createElement('tr');
            var column = document.createElement('td');
            column.colspan = '4';
            row.appendChild(column);

            column.innerHTML = 'Delivery';
            row.appendChild(column);

            column.innerHTML = 'Free delivery';
            row.appendChild(column);
            userCart.appendChild(row);

            var lastRow = document.createElement('tr');
            column.colspan = '4';
            lastRow.appendChild(column);
            column.innerHTML = 'Total amount';
            lastRow.appendChild(column);
            column.innerHTML = 'value';
            lastRow.appendChild(column);

            userCart.appendChild(lastRow);
        }
    };
    request.open("POST", "http://localhost/ittech/controller/sendToCartController.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("getCartProducts"); //goes in $_POST["getCartProducts"]
}


function checkQuantity(quantity, price, currentRow) {

    // if(quantity > cartProducts[i].quontity){
    //     var notEnoughQuantity = document.getElementById('checkQuantity');
    //     notEnoughQuantity.innerHTML = 'Not enough quantity!';
    // }
        var totalRow = document.getElementById('quantity' + currentRow);
        totalRow.innerHTML = Math.round(quantity * price).toFixed(2);
}
