window.onload = function () {
    var myOrders = document.getElementById('myOrders');
    var userOrders = new XMLHttpRequest();
    userOrders.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var userEmail = this.responseText;
        }
    };
    userOrders.open("POST","http://localhost/ittech/controller/showMyOrdersController.php");
    userOrders.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    userOrders.send('getOrdersUser');
};

