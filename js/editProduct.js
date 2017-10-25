window.onload = function () {
    if (sessionStorage.editProductObj) {
        var productToEditObj = JSON.parse(sessionStorage.editProductObj);
        sessionStorage.clear();

        var viewProductToEdit = document.getElementById('viewProductToEdit');

        var imageDiv = document.createElement('div');
        imageDiv.id = 'mainImage';
        imageDiv.style.width = '250px';
        imageDiv.style.border = '1px solid black';
        imageDiv.style.textAlign = 'center';

        var image = document.createElement('img');
        image.src = "http://localhost/ITTech/" + productToEditObj.imgs[0].img_url;
        image.style.width = '150px';
        image.style.height = 'auto';
        imageDiv.appendChild(image);
        viewProductToEdit.appendChild(imageDiv);

        var productAtributesDiv = document.createElement('div');
        productAtributesDiv.id = 'productAtributes';
        productAtributesDiv.style.border = '1px solid black';
        productAtributesDiv.style.width = '350px';

        var productAtributes = document.createElement('h4');
        productAtributes.innerText = productToEditObj.type + ' ' + productToEditObj.brand + ' ' + productToEditObj.model;
        productAtributesDiv.appendChild(productAtributes);

        var productId = document.createElement('h5');
        productId.id = 'productId';
        productId.value = productToEditObj.product_id;
        productId.innerText = 'Art.№' + productToEditObj.product_id;
        productAtributesDiv.appendChild(productId);
        viewProductToEdit.appendChild(productAtributesDiv);

        var priceDiv = document.createElement('div');
        priceDiv.id = 'price';
        // priceDiv.style.border = '1px solid green';
        priceDiv.style.width = '100px';
        priceDiv.style.height = '50px';
        priceDiv.style.color = 'red';

        if (productToEditObj.inPromo) {
            var imgPromo = document.createElement('img');
            imgPromo.style.width = '80px';
            imgPromo.style.height = 'auto';
            imgPromo.style.float = 'left';
            imgPromo.src = "./assets/displayImages/promo.png";
            imageDiv.appendChild(imgPromo);

            priceDiv.innerText = 'Promo prise: $' + productToEditObj.price;

        } else {
            priceDiv.innerText = '$' + productToEditObj.price;
        }
        viewProductToEdit.appendChild(priceDiv);

        document.getElementById('currentQuontity').innerText = productToEditObj.quontity;

        var editProductButton = document.getElementById('editProductButton');
        editProductButton.value = productToEditObj.product_id;

    } else {
        var editProductDiv = document.getElementById('editProductDiv');
        editProductDiv.innerHTML = '';
        var a = document.createElement('a');
        a.className = 'link';
        a.href = './';
        a.innerText = 'Select product to change';
        editProductDiv.appendChild(a);
    }
};

function editProduct(productId) {
    var inputQuontity = document.getElementById('newQuontity').value;
    var currentQuontity = document.getElementById('currentQuontity').innerText;

    if (inputQuontity.length > 0 && inputQuontity > 0 && /\d/.test(inputQuontity)) {

        var newQuontity = parseInt(currentQuontity) + parseInt(inputQuontity);

        var editProduct = {
            quontity: newQuontity,
            productId: productId
        };
        var editedProductJson = JSON.stringify(editProduct);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {

                    var viewProductToEdit = document.getElementById('viewProductToEdit');
                    viewProductToEdit.innerHTML = '';
                    viewProductToEdit.innerText = 'Successfully changed the product quontity';

                    var editProductDiv = document.getElementById('editProductDiv');
                    editProductDiv.innerHTML = '';
                    var allProductsLink = document.createElement('a');
                    allProductsLink.className = 'link';
                    allProductsLink.innerText = 'Select another product';
                    allProductsLink.href = './';
                    editProductDiv.appendChild(allProductsLink);
                }
            }
        };
        request.open("GET", "http://localhost/ittech/controller/editProductController.php?editProduct=" + editedProductJson);
        request.send();
    }

}