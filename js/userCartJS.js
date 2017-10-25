// TODO make the message with the quantity more fancy;

function showUserCart() {
    var userCart = document.getElementById('userCart');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var cartProducts = JSON.parse(this.responseText);
            var totalAmountOrder = Number(0);
            // cartProducts is a plain array with keys - numbers;
            for (var i = 0; i < cartProducts.length; i++) {
                var newRow = document.createElement('tr');
                newRow.id = 'row' + i;

                var newColumnNumber = document.createElement('td');
                newColumnNumber.id = 'tableRow' + (i + 1);
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
                newColumnPrice.id = 'price' + (i);
                newRow.appendChild(newColumnPrice);

                var newColumnQuantity = document.createElement('td');
                var inputFiled = document.createElement('input');
                inputFiled.type = 'number';
                inputFiled.id = i;
                inputFiled.required = true;
                inputFiled.value = '1';
                inputFiled.min = '1';
                inputFiled.max = Number(cartProducts[i].quontity) + Number(1); // to check for maximum exceeding;

                var newColumnAmount = document.createElement('td');
                newColumnAmount.id = 'quantity' + (i);
                newColumnAmount.innerHTML = cartProducts[i].price;

                inputFiled.onchange = function () {
                    var productPrice = document.getElementById('price' + this.id).innerHTML;
                    checkQuantity(this.value, productPrice, this.id, this.max - Number(1));
                };

                inputFiled.onkeyup = function () {
                    var productPrice = document.getElementById('price' + this.id).innerHTML;
                    checkQuantity(this.value, productPrice, this.id, this.max - Number(1));
                };

                totalAmountOrder += Number(newColumnAmount.innerHTML);

                newColumnQuantity.appendChild(inputFiled);
                newRow.appendChild(newColumnQuantity);

                newRow.appendChild(newColumnAmount);

                var removeProduct = document.createElement('td');
                var removeButton = document.createElement('button');
                removeButton.innerHTML = 'Remove';
                removeButton.value = i;
                removeButton.className = 'button';
                removeButton.onclick = function () {
                    deleteProductFromCart(this.value);
                };

               removeProduct.appendChild(removeButton);
               newRow.appendChild(removeProduct);

                userCart.appendChild(newRow);
            }
            var row1 = document.createElement('tr');
            var column = document.createElement('td');
            column.colSpan = '4';
            row1.appendChild(column);

            var columnDelivery = document.createElement('td');
            columnDelivery.innerHTML = 'Delivery';
            row1.appendChild(columnDelivery);

            var columnFreeDelivery = document.createElement('td');
            columnFreeDelivery.innerHTML = 'Free delivery';
            row1.appendChild(columnFreeDelivery);
            userCart.appendChild(row1);

            var lastRow = document.createElement('tr');
            var columnSpan = document.createElement('td');
            columnSpan.colSpan = '4';
            lastRow.appendChild(columnSpan);
            var totalAmountText = document.createElement('td');
            totalAmountText.innerHTML = 'Total amount';
            lastRow.appendChild(totalAmountText);
            var totalAmountNumber = document.createElement('td');
            totalAmountNumber.innerHTML = Math.round(totalAmountOrder).toFixed(2);
            totalAmountNumber.id = 'totalAmount';
            lastRow.appendChild(totalAmountNumber);

            userCart.appendChild(lastRow);
        }

    };
    request.open("POST", "http://localhost/ittech/controller/sendToCartController.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("getCartProducts"); //goes in $_POST["getCartProducts"]
}


function checkQuantity(quantity, price, currentRow, maxQuantityOnStock) {
    var totalAmount = document.getElementById('totalAmount');
    var inputField = document.getElementById(currentRow);
    var totalRow = document.getElementById('quantity' + currentRow);

    if(quantity > maxQuantityOnStock){
        var alertQuantity = document.getElementById('invalidQuantity');
        alertQuantity.style.display = 'block';
        inputField.value = maxQuantityOnStock;
    }

    var totalAmountNumber = Number(totalAmount.innerHTML);
    // substract old value
    totalAmountNumber -= Number(totalRow.innerHTML);

    // calculate new value
    totalRow.innerHTML = Math.round(quantity * price).toFixed(2);

    // add new value
    totalAmountNumber += Number(totalRow.innerHTML);

    totalAmount.innerHTML = Math.round(totalAmountNumber).toFixed(2);
}

function deleteProductFromCart(productObjectID){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var result = this.responseText;
            if (result == "Deleted") {
                var row = document.getElementById("row"+productObjectID);
                var totalAmountForProduct = document.getElementById('quantity' + productObjectID);
                var totalAmount = document.getElementById('totalAmount');
                var totalAmountNumber = Number(totalAmount.innerHTML);
                totalAmountNumber -= Number(totalAmountForProduct.innerHTML);

                //recalculate new total value for the whole order
                totalAmount.innerHTML = Math.round(totalAmountNumber).toFixed(2);

                //delete selected row
                row.parentNode.removeChild(row);

                //update the remaining row numbers
                var rowCount = Number(document.getElementById('userCart').rows.length);

                //start from deleted row
                //and it is minus 2, because the final rows don't include in the numbering of the table
                for(var i = Number(productObjectID) + 1; i < rowCount - 2; i++){
                    var newCurrentRow = document.getElementById('tableRow' + (i +1));
                    newCurrentRow.id = i;
                    newCurrentRow.innerHTML = i;
                }



                // for(var i = Number(productObjectID); i < rowCount - 2; i++){
                //     var newCurrentRow = document.getElementById('tableRow' + (i +1));
                //     newCurrentRow.id = 'tableRow' + i;
                //     newCurrentRow.innerHTML = i;
                // }
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/sendToCartController.php?deleteProductFromCart=" + productObjectID);
    request.send();
}

