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
    var contentContainer = document.getElementById('content-container');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var productsObject = this.responseText;
                alert(productsObject);
                for (var i = 0; i < productsObject.length; i++) {
                    for(var j in productsObject[i]){
                        alert(productsObject[i][j].product_id);
                    }

                    }
                }
            }
    };
    request.open("GET", "http://localhost/ittech/controller/mainController.php");
    request.send();
}

