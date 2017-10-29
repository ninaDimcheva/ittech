function showMyOrders () {
    var myOrders = document.getElementById('myOrders');
    var userOrders = new XMLHttpRequest();
    userOrders.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var userOrders = JSON.parse(this.responseText);
            var tableUserOrders = document.getElementById('tableUserOrders');
            for(var i in userOrders){
                var row = document.createElement('tr');
                var numberOrder = document.createElement('td');
                numberOrder.innerHTML = i;
                row.appendChild(numberOrder);

                var dateOrder = document.createElement('td');
                dateOrder.innerHTML = userOrders[i].date;
                row.appendChild(dateOrder);

                var orderStatus = document.createElement('td');
                orderStatus.innerHTML = userOrders[i].status;
                row.appendChild(orderStatus);

                var orderAddress = document.createElement('td');
                orderAddress.innerHTML = userOrders[i].address;
                row.appendChild(orderAddress);

                var totalOrder = document.createElement('td');
                totalOrder.innerHTML = userOrders[i].total;
                row.appendChild(totalOrder);

                tableUserOrders.appendChild(row);
            }
        }
    };
    userOrders.open("POST","http://localhost/ittech/controller/showMyOrdersController.php");
    userOrders.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    userOrders.send('getOrdersUser');
}

