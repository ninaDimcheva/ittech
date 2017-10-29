function showTypeTV() {
    var mainType = document.getElementById('tv');
    var typeDiv = document.getElementById('tvTypes');
    typeDiv.style.display = 'block';
    var showTypeTV = new XMLHttpRequest();
    showTypeTV.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var types = JSON.parse(this.responseText);
                typeDiv.innerHTML = '';
                var typeList = document.createElement("ul");
                for(var i in types){
                    var list = document.createElement('li');
                    list.innerHTML = types[i];
                    list.className = 'types';
                    // list.onmouseover = function () {
                    //     showBrandTV(this.innerText);
                    // };
                    // list.onmouseout = function () {
                    //     hideBrandTV();
                    // };
                    var br = document.createElement('br');
                    typeList.appendChild(br);
                    typeList.appendChild(list);
                }
                typeDiv.appendChild(typeList);
                mainType.appendChild(typeDiv);
            }
        }
    };
    showTypeTV.open("GET", "http://localhost/ittech/controller/addProductController.php?getTypes=" + 'TV sets and audio');
    showTypeTV.send();
}


function hideTypeTV(){
    var typeDiv = document.getElementById('tvTypes');
    typeDiv.style.display = 'none';
}


// function showBrandTV(type){
//     var typeDiv = document.getElementById('tvTypes');
//     var  brandTV = document.getElementById('tvBrands');
//     var showBrandTV= new XMLHttpRequest();
//     showBrandTV.onreadystatechange = function () {
//         if (this.readyState === 4) {
//             if (this.status === 200) {
//                 var brandsForType = JSON.parse(this.responseText);
//                 brandTV.innerHTML = '';
//                 var brandList = document.createElement("ul");
//                 for(var i in brandsForType){
//                         var list = document.createElement('li');
//                         list.innerHTML = brandsForType[i];
//                         list.value = brandsForType[i];
//                         list.className = 'brands';
//                         // list.onmouseover = function () {
//                         //     showBrandTV(this.value);
//                         // };
//                         // list.onmouseout = function () {
//                         //     hideBrandTV(this.value);
//                         // };
//                     var br = document.createElement('br');
//                     brandList.appendChild(br);
//                     brandList.appendChild(list);
//                     }
//                 brandTV.appendChild(brandList);
//                 typeDiv.appendChild(brandTV);
//             }
//         }
//     };
//     showBrandTV.open("GET", "http://localhost/ittech/controller/addProductController.php?getBrandsForType=" + type);
//     showBrandTV.send();
// }
//
// function hideBrandTV(){
//     var brandDiv = document.getElementById('tvBrands');
//     brandDiv.style.display = 'none';
// }




