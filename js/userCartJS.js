function showUserCart() {

    if (self.location == 'http://localhost/ittech/?page=userCart') {
        var userCart = document.getElementById('userCart');
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
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
                        image.src = "http://localhost/ittech/" + cartProducts[i].imgs[0].img_url;
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
                        inputFiled.value = cartProducts[i].orderedQuantity;
                        inputFiled.min = '1';
                        inputFiled.max = Number(cartProducts[i].quontity) + Number(1); // to check for maximum exceeding;

                        var newColumnAmount = document.createElement('td');
                        newColumnAmount.id = 'amount' + (i);
                        newColumnAmount.innerHTML = Number(Number(cartProducts[i].price) *
                            Number(cartProducts[i].orderedQuantity)).toFixed(2);

                        inputFiled.onchange = function () {

                            var productPrice = document.getElementById('price' + this.id).innerHTML;
                            checkQuantity(cartProducts[this.id], this.value, productPrice, this.id, this.max - Number(1));
                        };

                        inputFiled.onkeyup = function () {
                            var productPrice = document.getElementById('price' + this.id).innerHTML;
                            checkQuantity(cartProducts[this.id], this.value, productPrice, this.id, this.max - Number(1));
                        };


                        totalAmountOrder += Number(newColumnAmount.innerHTML);

                        newColumnQuantity.appendChild(inputFiled);
                        newRow.appendChild(newColumnQuantity);

                        newRow.appendChild(newColumnAmount);

                        var removeProduct = document.createElement('td');
                        var removeButton = document.createElement('button');
                        removeButton.innerHTML = 'Remove';
                        removeButton.id = 'removeButton' + i;
                        removeButton.value = i;
                        removeButton.className = 'button';
                        removeButton.onclick = function () {
                            var indexToBeDeleted = this.value;        // remember index, because the button is about to be removed
                            deleteProductFromCart(indexToBeDeleted);  // delete selected row from table
                            cartProducts.splice(indexToBeDeleted, 1); // clear from cart products, the deleted row from the table

                            if(cartProducts.length == 0){
                                orderButton.disabled = true;
                            }
                            else{
                                orderButton.disabled = false;
                            }
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
                    totalAmountText.innerHTML = 'Total amount $';
                    lastRow.appendChild(totalAmountText);
                    var totalAmountNumber = document.createElement('td');
                    totalAmountNumber.innerHTML = Number(totalAmountOrder).toFixed(2);
                    totalAmountNumber.id = 'totalAmount';
                    lastRow.appendChild(totalAmountNumber);

                    userCart.appendChild(lastRow);

                    var orderButtonDiv = document.getElementById('order');
                    var orderButton = document.createElement('button');

                    if(cartProducts.length == 0){
                        orderButton.disabled = true;
                    }
                    else{
                        orderButton.disabled = false;
                    }

                    orderButton.className = 'button';
                    orderButton.onclick = function () {
                        updateSessionCart(cartProducts);
                    };
                    orderButton.innerHTML = 'Order';
                    orderButtonDiv.appendChild(orderButton);
                } else {
                    window.location.replace('http://localhost/ittech?page=error500');
                }
            }
        };
        request.open("POST", "http://localhost/ittech/controller/sendToCartController.php");
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send("getCartProducts"); //goes in $_POST["getCartProducts"]
    }
}


function checkQuantity(currCartProduct, quantity, price, currentRow, maxQuantityOnStock) {
    var totalAmount = document.getElementById('totalAmount');
    var inputField = document.getElementById(currentRow);
    var totalRow = document.getElementById('amount' + currentRow);

    if (quantity > maxQuantityOnStock) {
        var invalidQuantity = document.getElementById('invalidQuantity');
        invalidQuantity.style.display = 'block';
        inputField.value = maxQuantityOnStock;
        quantity = maxQuantityOnStock;
    }

    //set the actual user selected quantity amount:
    currCartProduct.orderedQuantity = Number(inputField.value);

    var totalAmountNumber = Number(totalAmount.innerHTML);
    // substract old value
    totalAmountNumber -= Number(totalRow.innerHTML);

    // calculate new value
    totalRow.innerHTML = Number(quantity * price).toFixed(2);

    // add new value
    totalAmountNumber += Number(totalRow.innerHTML);

    totalAmount.innerHTML = Number(totalAmountNumber).toFixed(2);
}

function deleteProductFromCart(productObjectID) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var result = this.responseText;
                if (result == "Deleted") {
                    var row = document.getElementById("row" + productObjectID);
                    var totalAmountForProduct = document.getElementById('amount' + Number(productObjectID));  //warning
                    var totalAmount = document.getElementById('totalAmount');
                    var totalAmountNumber = Number(totalAmount.innerHTML);
                    totalAmountNumber -= Number(totalAmountForProduct.innerHTML);

                    //recalculate new total value for the whole order
                    totalAmount.innerHTML = Number(totalAmountNumber).toFixed(2);

                    var userCart = document.getElementById('userCart');

                    //delete selected row
                    row.parentNode.removeChild(row);

                    //we need to update the remaining row numbers
                    var rowCount = Number(userCart.rows.length);

                    //start from deleted row
                    var startRowIndex = Number(productObjectID);

                    //minus 2, because the final 2 rows don't include in the numbering of the table
                    var endRowIndex = rowCount - 2;

                    for (var i = startRowIndex; i < endRowIndex; i++) {
                        var newCurrentRow = document.getElementById('row' + (i + 1)); //get next row
                        newCurrentRow.id = 'row' + i;                                 //update it's id to previous index

                        var newCurrentRowNumber =
                            document.getElementById('tableRow' + (i + 2));            //get next tableRow
                        newCurrentRowNumber.id = 'tableRow' + (i + 1);                //update it's id to previous index
                        newCurrentRowNumber.innerHTML = (i + 1);                      //update it's value to be drawn

                        var removeButton =
                            document.getElementById('removeButton' + (i + 1));        //get next removeButton
                        removeButton.id = 'removeButton' + i;                         //update it's id to previous index
                        removeButton.value = i;                                       //update it's value to previous index

                        var newColumnAmount =
                            document.getElementById('amount' + (i + 1));              //get next amount field
                        newColumnAmount.id = 'amount' + i;                            //update it's id to previous index

                        var newColumnPrice =
                            document.getElementById('price' + (i + 1));               //get next price field
                        newColumnPrice.id = 'price' + i;                              //update it's id to previous index

                        var newInputField = document.getElementById('' + (i + 1));    //get next input field
                        newInputField.id = i;                                         //update it's id to previous index
                    }
                }
            } else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/sendToCartController.php?deleteProductFromCart=" + productObjectID);
    request.send();
}

function updateSessionCart(cartProducts) {
    var updateQunatityCart = new XMLHttpRequest();
    updateQunatityCart.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var resultCheckQuantityDB = JSON.parse(this.responseText);
                if (resultCheckQuantityDB) {
                    sessionStorage.cartArrayObjectProducts = JSON.stringify(cartProducts);
                    window.location.replace("http://localhost/ittech/?page=confirmOrder");
                }
                else {
                    var notenoughQuanityDB = document.getElementById('quantityWarning');
                    notenoughQuanityDB.innerHTML = 'Sorry, for the inconvenience, not enough quantity on stock!';
                }
            }else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    updateQunatityCart.open("POST", "http://localhost/ittech/controller/updateQuantitySessionController.php");
    updateQunatityCart.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    updateQunatityCart.send('userCart=' + JSON.stringify(cartProducts));
}

