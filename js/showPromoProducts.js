function showPromoProducts(orderBy) {
    if (self.location == 'http://localhost/ittech/?page=productsOnPromotions') {
        orderBy = orderBy || null;

        var getPromoProducts = new XMLHttpRequest();
        getPromoProducts.onreadystatechange = function () {
            var productsObject = JSON.parse(this.responseText);

            showProducts(productsObject, 'promoArticle');

        };
        getPromoProducts.open("Post", "http://localhost/ittech/controller/promoProductController.php");
        getPromoProducts.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        getPromoProducts.send('getPromoProducts=' + orderBy);
    }
}