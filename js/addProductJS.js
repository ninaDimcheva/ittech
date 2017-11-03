function showMainTypes() {
    if (self.location == 'http://localhost/ittech/?page=addProduct') {
        var getMainTypes = new XMLHttpRequest();
        getMainTypes.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    document.getElementById('mainTypeDiv').innerHTML = '';
                    var mainTypes = JSON.parse(this.responseText);
                    var select = document.createElement('select');
                    select.id = 'mainType';
                    select.className = 'addProductInputs';
                    select.name = 'mainType';
                    select.onchange = function () {
                        showTypes(this.value);
                    };
                    document.getElementById('mainTypeDiv').appendChild(select);
                    var mainOption = document.createElement('option');
                    mainOption.disabled = true;
                    mainOption.selected = true;
                    mainOption.innerText = 'Main Type';
                    document.getElementById('mainType').appendChild(mainOption);
                    for (var i in mainTypes) {
                        var option = document.createElement('option');
                        option.value = mainTypes[i];
                        option.innerText = mainTypes[i];
                        document.getElementById('mainType').appendChild(option);
                    }
                } else {
                    window.location.replace('http://localhost/ittech?page=error500');
                }
            }
        };
        getMainTypes.open("GET", "http://localhost/ittech/controller/addProductController.php?getMainTypes");
        getMainTypes.send();
    }
}

function showTypes(mainType) {
    var getTypes = new XMLHttpRequest();
    getTypes.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                document.getElementById('typeDiv').innerHTML = '';
                document.getElementById('brandDiv').innerHTML = '';
                document.getElementById('inputModel').innerHTML = '';
                document.getElementById('inputPrice').innerHTML = '';
                document.getElementById('inputQuontity').innerHTML = '';
                document.getElementById('inputSpecifications').innerHTML = '';
                document.getElementById('inputImg1').innerHTML = '';
                document.getElementById('inputImg2').innerHTML = '';
                document.getElementById('inputImg3').innerHTML = '';
                document.getElementById('submit').innerHTML = '';

                var types = JSON.parse(this.responseText);
                var select = document.createElement('select');
                select.id = 'type';
                select.className = 'addProductInputs';
                select.name = 'type';
                select.onchange = function () {
                    showBrands(this.value);
                };
                document.getElementById('typeDiv').appendChild(select);
                var mainOption = document.createElement('option');
                mainOption.disabled = true;
                mainOption.selected = true;
                mainOption.innerText = 'Type';
                document.getElementById('type').appendChild(mainOption);
                for (var i in types) {
                    var option = document.createElement('option');
                    option.value = types[i];
                    option.innerText = types[i];
                    document.getElementById('type').appendChild(option);
                }
            } else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    getTypes.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + mainType);
    getTypes.send();
}


function showBrands(type) {
    var getBrands = new XMLHttpRequest();
    getBrands.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                document.getElementById('brandDiv').innerHTML = '';
                document.getElementById('inputModel').innerHTML = '';
                document.getElementById('inputPrice').innerHTML = '';
                document.getElementById('inputQuontity').innerHTML = '';
                document.getElementById('inputSpecifications').innerHTML = '';
                document.getElementById('inputImg1').innerHTML = '';
                document.getElementById('inputImg2').innerHTML = '';
                document.getElementById('inputImg3').innerHTML = '';
                document.getElementById('submit').innerHTML = '';

                var brands = JSON.parse(this.responseText);

                var select = document.createElement('select');
                select.id = 'brand';
                select.className = 'addProductInputs';
                select.name = 'brand';
                select.onchange = function () {
                    showAttributes(type);
                };
                document.getElementById('brandDiv').appendChild(select);
                var brandOption = document.createElement('option');
                brandOption.disabled = true;
                brandOption.selected = true;
                brandOption.innerText = 'Brand';
                document.getElementById('brand').appendChild(brandOption);
                for (var i in brands) {
                    var option = document.createElement('option');
                    option.value = brands[i];
                    option.innerText = brands[i];
                    document.getElementById('brand').appendChild(option);
                }
            } else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    getBrands.open("GET", "http://localhost/ittech/controller/addProductController.php?getBrands");
    getBrands.send();
}

function showAttributes(type) {
    var getSpecifications = new XMLHttpRequest();
    getSpecifications.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var addProductModel = document.getElementById('inputModel');
                var addProductPrice = document.getElementById('inputPrice');
                var addProductQuontity = document.getElementById('inputQuontity');
                var addProductSpecifications = document.getElementById('inputSpecifications');

                addProductModel.innerHTML = '';
                addProductPrice.innerHTML = '';
                addProductQuontity.innerHTML = '';
                addProductSpecifications.innerHTML = '';
                document.getElementById('inputImg1').innerHTML = '';
                document.getElementById('inputImg2').innerHTML = '';
                document.getElementById('inputImg3').innerHTML = '';
                document.getElementById('submit').innerHTML = '';

                //===================== model atribute ===========================

                var modelLabelDiv = document.createElement('div');
                modelLabelDiv.className = 'addProductLabel';
                addProductModel.appendChild(modelLabelDiv);

                var modelLabel = document.createElement('label');
                modelLabel.for = 'model';
                modelLabel.innerHTML = 'Model: ';
                modelLabelDiv.appendChild(modelLabel);

                var modelInputDiv = document.createElement('div');
                modelInputDiv.className = 'addProductInputDiv';
                addProductModel.appendChild(modelInputDiv);

                var inputModel = document.createElement('input');
                inputModel.type = 'text';
                inputModel.name = 'model';
                inputModel.id = 'model';
                inputModel.className = 'addProductInputs';
                inputModel.autofocus = true;
                inputModel.required = true;
                modelInputDiv.appendChild(inputModel);

                //===================== price atribute ===========================

                var priceLabelDiv = document.createElement('div');
                priceLabelDiv.className = 'addProductLabel';
                addProductPrice.appendChild(priceLabelDiv);

                var priceLabel = document.createElement('label');
                priceLabel.for = 'price';
                priceLabel.innerHTML = 'Price: ';
                priceLabelDiv.appendChild(priceLabel);

                var priceInputDiv = document.createElement('div');
                priceInputDiv.className = 'addProductInputDiv';
                addProductPrice.appendChild(priceInputDiv);

                var price = document.createElement('input');
                price.type = 'number';
                price.name = 'addPrice';
                price.id = 'addPrice';
                price.required = true;
                priceInputDiv.appendChild(price);

                //===================== quontity atribute ===========================

                var quontityLabelDiv = document.createElement('div');
                quontityLabelDiv.className = 'addProductLabel';
                addProductQuontity.appendChild(quontityLabelDiv);

                var quontityLabel = document.createElement('label');
                quontityLabel.for = 'quontity';
                quontityLabel.innerHTML = 'Quontity: ';
                quontityLabelDiv.appendChild(quontityLabel);

                var quontityInputDiv = document.createElement('div');
                quontityInputDiv.className = 'addProductInputDiv';
                addProductQuontity.appendChild(quontityInputDiv);

                var quontity = document.createElement('input');
                quontity.type = 'number';
                quontity.name = 'quontity';
                quontity.id = 'quontity';
                quontity.required = true;
                quontityInputDiv.appendChild(quontity);

                //===================== specification atributes ===========================

                var specifications = JSON.parse(this.responseText);
                for (var i in specifications) {

                    var specifiacationDiv = document.createElement('div');
                    specifiacationDiv.className = 'addProductDiv displayInlineBlock';
                    addProductSpecifications.appendChild(specifiacationDiv);

                    var specificationLabelDiv = document.createElement('div');
                    specificationLabelDiv.className = 'addProductLabel';
                    specifiacationDiv.appendChild(specificationLabelDiv);

                    var label = document.createElement('label');
                    label.for = specifications[i];
                    label.innerHTML = specifications[i] + ': ';
                    specificationLabelDiv.appendChild(label);

                    var specificationInputDiv = document.createElement('div');
                    specificationInputDiv.className = 'addProductInputDiv';
                    specifiacationDiv.appendChild(specificationInputDiv);

                    var input = document.createElement('input');
                    input.id = specifications[i];
                    input.name = specifications[i];
                    specificationInputDiv.appendChild(input);
                    // var br = document.createElement('br');
                    // document.getElementById('inputSpecifications').appendChild(br);
                }

                //===================== images ===========================

                var labelImg1 = document.createElement('label');
                labelImg1.for = 'img1';
                labelImg1.innerHTML = 'Image1(max size 2M): ';
                document.getElementById('inputImg1').appendChild(labelImg1);
                var inputImg1 = document.createElement('input');
                inputImg1.type = "file";
                inputImg1.id = 'img1';
                inputImg1.name = 'img1';
                inputImg1.accept = "image/*";
                inputImg1.required = true;
                inputImg1.onchange = function () {
                    checkImgSize(this.files[0].size, this.id);
                };
                document.getElementById('inputImg1').appendChild(inputImg1);

                var labelImg2 = document.createElement('label');
                labelImg2.for = 'img2';
                labelImg2.innerHTML = 'Image2(max size 2M): ';
                document.getElementById('inputImg2').appendChild(labelImg2);
                var inputImg2 = document.createElement('input');
                inputImg2.type = "file";
                inputImg2.id = 'img2';
                inputImg2.name = 'img2';
                inputImg2.accept = "image/*";
                inputImg2.required = true;
                inputImg2.onchange = function () {
                    checkImgSize(this.files[0].size, this.id);

                };
                document.getElementById('inputImg2').appendChild(inputImg2);

                var labelImg3 = document.createElement('label');
                labelImg3.for = 'img3';
                labelImg3.innerHTML = 'Image3(max size 2M): ';
                document.getElementById('inputImg3').appendChild(labelImg3);
                var inputImg3 = document.createElement('input');
                inputImg3.type = "file";
                inputImg3.id = 'img3';
                inputImg3.name = 'img3';
                inputImg3.accept = "image/*";
                inputImg3.required = true;
                inputImg3.onchange = function () {
                    checkImgSize(this.files[0].size, this.id);
                };
                document.getElementById('inputImg3').appendChild(inputImg3);

                var submit = document.createElement('input');
                submit.type = "submit";
                submit.id = 'submit';
                submit.className = 'button';
                submit.name = 'addProduct';
                submit.value = 'Add product';
                document.getElementById('submit').appendChild(submit);
            } else {
                window.location.replace('http://localhost/ittech?page=error500');
            }
        }
    };
    getSpecifications.open("GET", "http://localhost/ittech/controller/addProductController.php?getSpecifications=" + type);
    getSpecifications.send();
}

function checkImgSize(size, id) {
    if (size > 2097152) {
        alert('The size of uploded image must be up to 2M');
        document.getElementById(id).value = '';
    }
}