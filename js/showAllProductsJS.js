// var distToBottom, data, dataObj;
// var page = 1;
// var pollingForData = false;
// var xhr = new XMLHttpRequest();
// var contentContainer = document.getElementsByClassName('content-container')[0];
// var loadingContainer = document.getElementsByClassName('loading-container')[0];
//
// function getDistFromBottom () {
//
//     var scrollPosition = window.pageYOffset;
//     var windowSize     = window.innerHeight;
//     var bodyHeight     = document.body.offsetHeight;
//
//     return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
//
// }
//
// xhr.onload = function() {
//     if(xhr.status === 200) {
//
//         pollingForData = false;
//         data = xhr.responseText;
//         dataObj = JSON.parse(data);
//
//         // for iterating through the data
//         // Using a ForEach
//
//         dataObj.posts.forEach(function(post, index) {
//
//             var postElement = document.createElement('article');
//
//             var title = document.createElement('h3');
//             title.appendChild(document.createTextNode(post.title));
//             title.classList.add('title');
//
//             var img = document.createElement('img');
//             img.src = post.featured_image.source;
//             img.classList.add('feat');
//
//
//             var author = document.createElement('p');
//             author.appendChild(document.createTextNode(post.author));
//             author.classList.add('author');
//
//             // since the text already comes out as this
//             var desc = document.createElement('div');
//             desc.innerHTML = post.content;
//             desc.classList.add('content');
//
//             var hrElem = document.createElement('hr');
//             hrElem.classList.add('separator');
//
//             postElement.appendChild(title);
//             postElement.appendChild(img);
//             // postElement.appendChild(desc);
//             postElement.appendChild(hrElem);
//
//             contentContainer.appendChild(postElement);
//         })
//
// //     // Using a For Loop
// //     for(var i = 0; i <= dataObj.posts.length; i++ ) {
// //       console.log('data ', i);
// //     }
//
//         // removing the spinner
//         // loadingContainer.classList.remove('no-content');
//
//     }
// };
//
// xhr.open('GET', 'https://www.techinasia.com/wp-json/techinasia/2.0/posts?page=1&per_page=5', true);
// xhr.send();
// pollingForData = true;
//
// document.addEventListener('scroll', function() {
//     distToBottom = getDistFromBottom();
//     // console.log('scrolling', getDistFromBottom());
//
//     if (!pollingForData && distToBottom > 0 && distToBottom <= 8888) {
//         pollingForData = true;
//         loadingContainer.classList.add('no-content');
//
//         page++;
//         xhr.open('GET', 'https://www.techinasia.com/wp-json/techinasia/2.0/posts?page='+page+'&per_page=5', true);
//         xhr.send();
//
//     }
// });

function showAllProducts() {
    var productNumber;
    var currentProduct = 0;
    var article = document.getElementById('article');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var productsObject = JSON.parse(this.responseText);
            var productsCount = productsObject.length;
            for (var i = 0; i < productsCount; i+=4) {
                if (i % 4 === 0) {

                    // ---------------------------------
                    // creates the main content container which will show 4 products;

                    var contentContainer = document.createElement('div');
                    contentContainer.id = "contentContainer" + ((i / 4) + 1);
                    // contentContainer.style.width = '';
                    // contentContainer.style.height = '140px';
                    contentContainer.style.border = '1px solid red';
                    contentContainer.style.margin = '0.5px';
                    contentContainer.style.clear = 'both';
                    article.appendChild(contentContainer);
                }
                    // ---------------------------------


                    if ((productsCount - i) > 4) {
                        productNumber = 4;
                    }
                    else {
                        productNumber = productsCount - i;
                    }

                    // ---------------------------------
                    // creates the single panel, which will show information only for one product;

                    for (var j = 1; j <= productNumber; j++) {
                        var panel = document.createElement('div');
                        panel.className = 'infoPanel';
                        panel.style.margin = '1.5px';
                        panel.style.border = '1px solid green';
                        panel.style.float = 'left';
                        document.getElementById(contentContainer.id).appendChild(panel);
                        var imageDiv = document.createElement('div');
                        imageDiv.className = 'imageDiv';
                        panel.appendChild(imageDiv);
                        var img = document.createElement('img');
                        img.src = "http://localhost/ITTech/" + productsObject[currentProduct].imgs[0].img_url;
                        img.style.width = '150px';
                        img.style.height = 'auto';
                        img.value = productsObject[currentProduct];
                        img.onclick = function () {
                            sendProductObject(this.value);
                        };
                        imageDiv.appendChild(img);
                        var infoProduct = document.createElement('div');
                        infoProduct.className = 'infoProduct';
                        panel.appendChild(infoProduct);
                        var brand = document.createElement('h4');
                        brand.innerText = productsObject[currentProduct].brand;
                        infoProduct.appendChild(brand);
                        var model = document.createElement('h3');
                        model.innerText = productsObject[currentProduct].model;
                        infoProduct.appendChild(model);
                        var price = document.createElement('h2');
                        model.innerText = productsObject[currentProduct].price;
                        infoProduct.appendChild(price);

                        // TODO test the buy button

                        var buyButton = document.createElement('div');
                        buyButton.className = 'button';
                        buyButton.innerHTML = 'BUY';
                        buyButton.value = productsObject[currentProduct];
                        buyButton.onclick = function () {
                            sendToCart(this.value);
                        };
                        panel.appendChild(buyButton);
                        currentProduct++;
                    }
                }

        }
    };
    request.open("GET", "http://localhost/ittech/controller/mainController.php?getAllProducts");
    request.send();
}

/**
 *
 * @param product = Object product
 */
function sendProductObject(product) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // TODO check if it is ok with can manage only with status code, you don't return echo from the main controller -> make sure it is ok!!!!!!;
            window.location.replace("http://localhost/ITTech/?page=viewSingleProduct");
        }
    };
    request.open("POST", "http://localhost/ittech/controller/mainController.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("object=" + JSON.stringify(product)); //goes in $_POST["object"]
}

/**
 *
 * @param product = Object product
 */
function sendToCart(product) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // TODO check if it is ok with can manage only with status code, you don't return echo from the main controller -> make sure it is ok!!!!!!;
            window.location.replace("http://localhost/ITTech/?page=viewSingleProduct");
        }
    };
    request.open("POST", "http://localhost/ittech/controller/mainController.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send("object=" + JSON.stringify(product)); //goes in $_POST["object"]
}

