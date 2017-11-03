function showPromoProducts(orderBy) {
    if (self.location == 'http://localhost/ittech/?page=productsOnPromotions') {
        orderBy = orderBy || null;

        var getPromoProducts = new XMLHttpRequest();
        getPromoProducts.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    if (this.responseText){
                        var productsObject = JSON.parse(this.responseText);
                        showProducts(productsObject, 'promoArticle');
                    }else {
                        document.getElementById('promoArticle').innerHTML = 'There is no products in promotion!';
                    }
                }else {
                    window.location.replace('http://localhost/ittech?page=error'+this.status);
                }
            }
        };
        getPromoProducts.open("Post", "http://localhost/ittech/controller/promoProductController.php");
        getPromoProducts.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        getPromoProducts.send('getPromoProducts=' + orderBy);
    }
}