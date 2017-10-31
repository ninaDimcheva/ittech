// function loadPage(diff) {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function () {
//         if(this.status == 200 && this.readyState == 4) {
//             var result  = this.responseText;
//             var productContainer = document.getElementById("article");
//             if(result == 'setPage'){
//                // productContainer.innerHTML = "";
//                 // for (var url in urls) {
//                 //     var img = document.createElement("img");
//                 //     img.src = "http://localhost/ImageHub" + urls[url];
//                 //     img.width = "200";
//                 //     img.height = "200";
//                 //     imageholder.appendChild(img);
//                    document.getElementById("page").value = parseInt(document.getElementById("page").value)+diff;
//                // }
//            }
//         }
//     };
//     request.open("get", "http://localhost/ittech/controller/mainController.php?page="+(parseInt(document.getElementById("page").value)+diff));
//     request.send();
// }
