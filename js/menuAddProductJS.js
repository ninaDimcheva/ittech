function showMainTypes(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200){
                var mainTypes = JSON.parse(this.responseText);
                document.getElementById('mainTypes').innerHTML = '';
                var select = document.createElement('select');
                select.id = 'mainType';
                select.onchange = function() { showTypes(this.value); };
                document.getElementById('mainTypes').appendChild(select);
                var mainOption = document.createElement('option');
                    mainOption.disabled = true;
                    mainOption.selected = true;
                    mainOption.innerText = 'Main Type';
                    document.getElementById('mainType').appendChild(mainOption);
                    for (var i in mainTypes){
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
            if (this.status === 200){
                var types = JSON.parse(this.responseText);
                document.getElementById('types').innerHTML = '';
                var select = document.createElement('select');
                select.id = 'type';
                select.onchange = function() { showTypesSpec(this.value); };
                document.getElementById('types').appendChild(select);
                var mainOption = document.createElement('option');
                mainOption.disabled = true;
                mainOption.selected = true;
                mainOption.innerText = 'Type';
                document.getElementById('type').appendChild(mainOption);
                for (var i in types){
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