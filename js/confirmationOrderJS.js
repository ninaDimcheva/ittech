// TODO information user style and think avout the redirection of the user!!!!!!!!!!!!!!!!!

// the function will check if the user is already logged in after the order had been checked from php and will visualize details about the order!
window.onload = function () {
    var isLoggedUser = new XMLHttpRequest();
    isLoggedUser.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var userEmail = this.responseText;
            if (userEmail) {
                var statusInformation = document.getElementById('statusOrder');
                var orderStepOne = document.createElement('div');
                orderStepOne.innerHTML = '1';
                orderStepOne.style.backgroundColor = 'red';
                orderStepOne.style.float = 'left';
                statusInformation.appendChild(orderStepOne);
                var orderStepOneInfo = document.createElement('div');
                orderStepOneInfo.innerHTML = 'Your order is nor yet confirmed';
                orderStepOneInfo.style.float = 'left';
                statusInformation.appendChild(orderStepOneInfo);

                var dateTimeOrder = document.createElement('h4');
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                dateTimeOrder.innerHTML = 'Date: ' + today;
                dateTimeOrder.style.clear = 'both';
                statusInformation.appendChild(dateTimeOrder);

                var statusOrder = document.createElement('h4');
                statusOrder.innerHTML = 'Status order: Unconfirmed order';
                statusInformation.appendChild(statusOrder);

                var emailUser = document.createElement('h4');
                emailUser.innerHTML = 'E-mail: ' + userEmail;
                statusInformation.appendChild(emailUser);


                // ------------------------------------------------------------------//

                var userCartToOrder = document.getElementById('productsCartInformation');
                var orderStepTwo = document.createElement('div');
                orderStepTwo.innerHTML = '2';
                orderStepTwo.style.backgroundColor = 'red';
                orderStepTwo.style.float = 'left';
                userCartToOrder.appendChild(orderStepTwo);
                var orderStepTwoInfo = document.createElement('div');
                orderStepTwoInfo.innerHTML = 'Detailed information about your order';
                orderStepTwoInfo.style.float = 'left';
                userCartToOrder.appendChild(orderStepTwoInfo);
                var totalAmount = 0;
                var cartProducts = JSON.parse(sessionStorage.cartArrayObjectProducts);
                sessionStorage.clear();
                for (var i = 0; i < cartProducts.length; i++) {
                    var productDescription = document.createElement('h4');
                    productDescription.innerHTML = cartProducts[i].type + cartProducts[i].brand + cartProducts[i].model;
                    productDescription.style.clear = 'both';
                    userCartToOrder.appendChild(productDescription);

                    var productPrice = document.createElement('h4');
                    productPrice.innerHTML = 'Single price :' + cartProducts[i].price;
                    productPrice.style.clear = 'both';
                    userCartToOrder.appendChild(productPrice);

                    var orderedQuantity = document.createElement('h4');
                    orderedQuantity.innerHTML = 'Ordered quantity: ' + cartProducts[i].orderedQuantity;
                    orderedQuantity.style.clear = 'both';
                    userCartToOrder.appendChild(orderedQuantity);

                    // it is used +Number(totalAmount) + +(Number) -> javascript way to sum two numbers;
                    totalAmount = +Number(totalAmount) + +((Number(cartProducts[i].price) * Number(cartProducts[i].orderedQuantity)).toFixed(2));

                }
                var totalAmountForOrder = document.createElement('h4');
                totalAmountForOrder.innerHTML = 'Ordered quantity: ' + totalAmount;
                totalAmountForOrder.style.clear = 'both';
                userCartToOrder.appendChild(totalAmountForOrder);

            }
            else {
                window.location.replace("http://localhost/ITTech/?page=login");
            }
        }
    };
    isLoggedUser.open("GET", "http://localhost/ittech/controller/isLoggedController.php?isSetUser");
    isLoggedUser.send();

};

// -------------   validate the entered address:   --------------------//


function validateAddress() {
    var inputFieldAddress = document.getElementById('address').value;
    var addressWarning = document.getElementById('addressWarning');
    var error = false;

    if (inputFieldAddress.length > 0 && inputFieldAddress.length <= 70){
        addressWarning.innerText = '✔';
        addressWarning.style.color = 'green';

    }else {
        error = true;
        addressWarning.innerText = '✘';
        addressWarning.style.color = '#e60000';
    }

    if (!error){
        document.getElementById('confirmedOrder').disabled = false;
    }else {
        document.getElementById('confirmedOrder').disabled = true;
    }
}