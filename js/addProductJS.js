function showMainTypes() {
    var getMainTypes = new XMLHttpRequest();
    getMainTypes.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                if(this.responseText.length > 2){
                    document.getElementById('mainTypeDiv').innerHTML = '';
                    var mainTypes = JSON.parse(this.responseText);
                    var select = document.createElement('select');
                    select.id = 'mainType';
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
                }else {
                    // TODO window.location.replace('http://localhost/ittech?page=error');
                }
            }else {
                // TODO window.location.replace('http://localhost/ittech?page=error');
            }
        }
    };
    getMainTypes.open("GET", "http://localhost/ittech/controller/addProductController.php?getMainTypes");
    getMainTypes.send();
}

function showTypes(mainType) {
    var getTypes = new XMLHttpRequest();
    getTypes.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                if(this.responseText.length > 2){
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

                }else {
                    // TODO window.location.replace('http://localhost/ittech?page=error');
                }
            }else {
                // TODO window.location.replace('http://localhost/ittech?page=error');
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
                if(this.responseText.length > 2){
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
                }else {
                    // TODO window.location.replace('http://localhost/ittech?page=error');
                }
            }else {
                // TODO window.location.replace('http://localhost/ittech?page=error');
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
                if(this.responseText.length > 2){
                    document.getElementById('inputModel').innerHTML = '';
                    document.getElementById('inputPrice').innerHTML = '';
                    document.getElementById('inputQuontity').innerHTML = '';
                    document.getElementById('inputSpecifications').innerHTML = '';
                    document.getElementById('inputImg1').innerHTML = '';
                    document.getElementById('inputImg2').innerHTML = '';
                    document.getElementById('inputImg3').innerHTML = '';
                    document.getElementById('submit').innerHTML = '';

                    var modelLabel = document.createElement('label');
                    modelLabel.for = 'model';
                    modelLabel.innerHTML = 'Model: ';
                    document.getElementById('inputModel').appendChild(modelLabel);
                    var model = document.createElement('input');
                    model.type = 'text';
                    model.name = 'model';
                    model.id = 'model';
                    model.autofocus = true;
                    model.required = true;
                    document.getElementById('inputModel').appendChild(model);

                    var priceLabel = document.createElement('label');
                    priceLabel.for = 'price';
                    priceLabel.innerHTML = 'Price: ';
                    document.getElementById('inputPrice').appendChild(priceLabel);
                    var price = document.createElement('input');
                    price.type = 'number';
                    price.name = 'price';
                    price.id = 'price';
                    price.required = true;
                    document.getElementById('inputPrice').appendChild(price);

                    var quontityLabel = document.createElement('label');
                    quontityLabel.for = 'quontity';
                    quontityLabel.innerHTML = 'Quontity: ';
                    document.getElementById('inputQuontity').appendChild(quontityLabel);
                    var quontity = document.createElement('input');
                    quontity.type = 'number';
                    quontity.name = 'quontity';
                    quontity.id = 'quontity';
                    quontity.required = true;
                    document.getElementById('inputQuontity').appendChild(quontity);

                    var specifications = JSON.parse(this.responseText);
                    for (var i in specifications) {
                        var label = document.createElement('label');
                        label.for = specifications[i];
                        label.innerHTML = specifications[i];
                        document.getElementById('inputSpecifications').appendChild(label);
                        var input = document.createElement('input');
                        input.id = specifications[i];
                        input.name = specifications[i];
                        document.getElementById('inputSpecifications').appendChild(input);
                        var br = document.createElement('br');
                        document.getElementById('inputSpecifications').appendChild(br);
                    }

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
                    submit.name = 'addProduct';
                    submit.value = 'Add product';
                    document.getElementById('submit').appendChild(submit);
                }else {
                    // TODO window.location.replace('http://localhost/ittech?page=error');
                }
            }else {
                // TODO window.location.replace('http://localhost/ittech?page=error');
            }
        }
    };
    getSpecifications.open("GET", "http://localhost/ittech/controller/addProductController.php?getSpecifications=" + type);
    getSpecifications.send();
}

function checkImgSize(size, id){
    if (size > 2097152){
        alert('The size of uploded image must be up to 2M');
        document.getElementById(id).value = '';
    }
}