function showMainTypes() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                document.getElementById('addProductForm').innerHTML = '';
                var mainTypes = JSON.parse(this.responseText);
                var select = document.createElement('select');
                select.id = 'mainType';
                select.name = 'mainType';
                select.onchange = function () {
                    if(document.getElementById('type')){
                        showMainTypes();
                    }else {
                        showTypes(this.value);
                    }

                };
                document.getElementById('addProductForm').appendChild(select);
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
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/addProductController.php?getMainTypes");
    request.send();
}

function showTypes(value) {
    var mainType = value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var types = JSON.parse(this.responseText);
                if (document.getElementById('type')) {
                    document.getElementById('type').innerHTML = '';
                } else {
                    var select = document.createElement('select');
                    select.id = 'type';
                    select.name = 'type';
                    select.onchange = function () {
                        showAllOptions(this.value);
                    };
                    document.getElementById('addProductForm').appendChild(select);
                }
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
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + mainType);
    request.send();
}

function showAllOptions(value) {
    if(!document.getElementById('brand')){
        showBrands();
    }

    var type = value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                    var specifications = JSON.parse(this.responseText);
                    if (!document.getElementById('existSpec')){
                        var div = document.createElement('div');
                        div.id = 'existSpec';
                        document.getElementById('addProductForm').appendChild(div);
                        for (var i in specifications) {
                            var br = document.createElement('br');
                            document.getElementById('addProductForm').appendChild(br);
                            var label = document.createElement('label');
                            label.for = specifications[i];
                            label.innerHTML = specifications[i];
                            document.getElementById('addProductForm').appendChild(label);
                            var input = document.createElement('input');
                            input.id = specifications[i];
                            input.name = specifications[i];
                            document.getElementById('addProductForm').appendChild(input);
                    }

                }
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/addProductController.php?getSpecifications=" + type);
    request.send();
}

function showBrands() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var brands = JSON.parse(this.responseText);
                var select = document.createElement('select');
                select.id = 'brand';
                select.name = 'brand';
                document.getElementById('addProductForm').appendChild(select);
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
            }
        }
    };
    request.open("GET", "http://localhost/ittech/controller/addProductController.php?getBrands");
    request.send();
}