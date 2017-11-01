function viewRemoveProduct() {
    if (self.location == 'http://localhost/ittech/?page=removeProduct') {
        var viewRemoveProduct = document.getElementById('viewRemoveProduct');
        if (sessionStorage.removeProductObj) {
            var removeProduct = JSON.parse(sessionStorage.removeProductObj);
            var imageDiv = document.createElement('div');
            imageDiv.id = 'mainImage';
            imageDiv.style.width = '250px';
            imageDiv.style.border = '1px solid black';
            imageDiv.style.textAlign = 'center';

            var image = document.createElement('img');
            image.src = "http://localhost/ittech/" + removeProduct.imgs[0].img_url;
            image.style.width = '150px';
            image.style.height = 'auto';
            imageDiv.appendChild(image);
            viewRemoveProduct.appendChild(imageDiv);

            var productAtributesDiv = document.createElement('div');
            productAtributesDiv.id = 'productAtributes';
            productAtributesDiv.style.border = '1px solid black';
            productAtributesDiv.style.width = '350px';

            var productAtributes = document.createElement('h4');
            productAtributes.innerText = removeProduct.type + ' ' + removeProduct.brand + ' ' + removeProduct.model;
            productAtributesDiv.appendChild(productAtributes);

            var productId = document.createElement('h5');
            productId.id = 'productId';
            productId.value = removeProduct.product_id;
            productId.innerText = 'Art.№' + removeProduct.product_id;
            productAtributesDiv.appendChild(productId);
            viewRemoveProduct.appendChild(productAtributesDiv);

            var priceDiv = document.createElement('div');
            priceDiv.id = 'price';
            priceDiv.style.border = '1px solid green';
            priceDiv.style.width = '100px';
            priceDiv.style.height = '50px';
            priceDiv.innerHTML = removeProduct.price + ' $';
            viewRemoveProduct.appendChild(priceDiv);

            var removeProductButton = document.getElementById('removeProductButton');
            removeProductButton.value = removeProduct.product_id;

        }else {
            var removeProductSubmit = document.getElementById('removeProductSubmit');
            removeProductSubmit.innerHTML = '';
            viewRemoveProduct.innerHTML = 'There is no selected product';
            var allProductsLink = document.createElement('a');
            allProductsLink.className = 'link';
            allProductsLink.innerText = 'Select another product';
            allProductsLink.href = './';
            removeProductSubmit.appendChild(allProductsLink);
        }
    }
}

function removeProduct(productId) {
    sessionStorage.clear();
    var removeProduct = new XMLHttpRequest();
    removeProduct.onreadystatechange = function () {
        if (this.readyState === 4){
            if (this.status === 200){
                var viewRemoveProduct =  document.getElementById('viewRemoveProduct');
                viewRemoveProduct.innerHTML = 'Successfully remove the product';
                var br = document.createElement('br');
                viewRemoveProduct.appendChild(br);

                var removeProductSubmit = document.getElementById('removeProductSubmit');
                removeProductSubmit.innerHTML = '';
                var main = document.createElement('a');
                main.className = 'link';
                main.innerText = 'View all products';
                main.href = './';
                removeProductSubmit.appendChild(main);
            }else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    removeProduct.open("GET", "http://localhost/ittech/controller/removeProductController.php?removeProduct=" + productId);
    removeProduct.send();
}