function loadPage(diff) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.status == 200 && this.readyState == 4) {
            //we have received the urls
            var urls  = JSON.parse(this.responseText);
            var imageholder = document.getElementById("imageholder");
            if(urls.length != 0){
                imageholder.innerHTML = "";
                for (var url in urls) {
                    var img = document.createElement("img");
                    img.src = "http://localhost/ImageHub" + urls[url];
                    img.width = "200";
                    img.height = "200";
                    imageholder.appendChild(img);
                    document.getElementById("page").value = parseInt(document.getElementById("page").value)+diff;
                }
            }
        }
    };
    request.open("get", "http://localhost:80/ImageHub/controller/image_controller.php?page="+(parseInt(document.getElementById("page").value)+diff));
    request.send();
    //for each url from the list
    //create img with src and width
    //add it to div imageholder
}
